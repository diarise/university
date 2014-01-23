<?php
class twistage_api{
	public function __construct($pid,$preroll=false){
		$this->profile=new twistage_profile($pid,$preroll);
	}
	public function fetch_video($vid){
		$signature = _twistage_authenticate($this->profile->site_key);
		$url = "http://console.twistage.com/videos/$vid.json?signature=" . urlencode($signature);
		return json_decode(file_get_contents($url));
	}
	public function fetch_videos_by_tag($tag){
		$tag=urlencode($tag);
		$signature = $this->authenticate();
		$url = "http://twistassets.kabbalah.com/companies/kabbalah-centre/videos.json?signature=" . urlencode($signature) . "&tags=$tag";
		return json_decode(file_get_contents($url));
	}
	public function fetch_video_tags($page=1){
		$signature = $this->authenticate();
		$url = "http://twistassets.kabbalah.com/companies/kabbalah-centre/tags.json?page=$page&signature=" . urlencode($signature);
		if($json=@file_get_contents($url)) return json_decode($json);
		return false;
		
	}
	public function load_from_url($url,$args){
		$args['signature']=$this->authenticate();
		$args['verbosity']='high';
		$url.='?'.http_build_query($args);
		$data=@file_get_contents($url);
		return $data?json_decode($data):false;
	}
	public function authenticate($publishUser = false) {
		$sig=variable_get('twistal_authenticate',false);
		if($sig && ($sig['exp']>time())) return $sig['sig'];
		$key=$this->profile->site_key;
		$url = "http://service.twistage.com/api/view_key";
		$url .= "?authKey=" . urlencode($key);    
		$fp = fopen($url, "r");
		if ($fp) {
			$signature = fread($fp, 40);
			fclose($fp);
		} else {
			$signature = "";
		}
		variable_set('twistal_authenticate',array('sig'=>$signature,'exp'=>time()+60));
		return $signature;
	}
}
class twistage_profile{
	private $data;
	public $type;
	public function __construct($pid=1,$preroll=false){
		$this->data=array();
		$this->type=$preroll?'preroll':'data';
		$profiles=twistal_profiles();
		if(is_array($pid)){
			$this->data=$pid;
			$pid=count($profiles);
		}else{
			if(!isset($profiles[$pid*1])) return;
			$this->data=(array)$profiles[$pid*1];
		}
		$this->data['pid']=$pid;
	}
	public function __get($name){
		$preroll=array('company','site_name','site_key','site_username');
		if($this->type=='preroll' && in_array($name,$preroll)) $name='preroll_'.$name;
		if(array_key_exists($name, $this->data)) return $this->data[$name];
	}
	public function __set($name,$value){
		$this->data[$name]=$value;
	}
	public function save(){
		$profiles=twistal_profiles();
		$profiles[$this->pid]=$this->data;
		variable_set('twistal_profiles',$profiles);
		twistal_profiles(true);
	}
	public function delete(){
		$profiles=twistal_profiles();
		unset($profiles[$this->pid]);
		variable_set('twistal_profiles',$profiles);
		twistal_profiles(true);
	}
}
class twistage_video{
	private $data;
	private $assets;
	public function __get($name){
		if(array_key_exists($name, $this->data)){
			return $this->data[$name];
		}
		if(user_access('administer twistal')) drupal_set_message("Undefined property $name on twistage video");
	}
	public function __set($name,$value){
		$this->data[$name]=$value;
	}
	public function __construct($data=false){
		$this->data=$this->validate(true);
		if(!$this->data['assets']) $this->data['assets']=array();
		if(!$data) return;
		if(!is_string($data)) $this->data=$data;
		else $this->load($data);
	}
	public function save(){    
		if($this->validate()){
			db_delete('twistal_data')
				->condition('vid', $this->data['vid'])
				->execute();
			$edit=$this->data;
			$tag_ins_list=$tag_del_list=array();
			$vid=$this->data['vid'];
			foreach($edit['tags'] as $tag){
				$tag_ins_list[]=array($vid,$tag);
				$tag_del_list[]=$tag;
			}
			unset($edit['tags']);
			db_delete('tags_twistal')
				->condition('vid', $this->data['vid'])
				->execute();
			if(!empty($tag_ins_list)){
				$tag_insert=db_insert('tags_twistal')
					->fields(array('vid','tag'));
					foreach($tag_ins_list as $vals){
						$tag_insert->values($vals);
					}
					$tag_insert->execute();
			}
			if(isset($edit['assets'])){
				$assets=$edit['assets'];
			}
			$base=$this->validate(true);
			$vals=array();
			unset($base['assets']);
			foreach(array_keys($base) as $key){
				$vals[]=$edit[$key];
				unset($edit[$key]);
			}
			
			$fields=array_keys($base);
			$fields[]='data';
			$vals[]=serialize($edit);
			$return=db_insert('twistal_data')
				->fields($fields)
				->values($vals)
				->execute();
			if(is_array($assets)){
				foreach($assets as $asset){
					db_merge('twistal_assets')
						->key(array('aid' => $asset->id))
						->fields(array(
						  'vid' => $vid,
						  'data' => serialize($asset),
						))
						->execute();
				}
			}
			return $return;
		}
		return false;
	}
	public function load($vid){
		
		$this->data=db_query("SELECT * FROM twistal_data WHERE vid='$vid'")->fetchAssoc();
		$tags=db_query("SELECT * FROM tags_twistal WHERE vid='$vid'");
		$this->data['tags']=$tags->fetchAllAssoc('tag');
		$assets=db_query("SELECT * FROM twistal_assets WHERE vid='$vid'")->fetchAllAssoc('aid');
		foreach($assets as $aid=>$data){
			$this->data['assets'][$aid]=unserialize($data->data);
		}
		if(empty($this->data['assets'])) import_twistal_video($vid);
	}
	public function import($vdata,$pid=1){
		$edit=(array)$vdata;
		$tags=array();
		foreach($edit['tags'] as $tag){
			$tags[]=$tag->name;
		}
		
		$this->data=array(
			'pid'=>$pid,
			'vid'=>$edit['video_id'],
			'title'=>$edit['title'],
			'description'=>$edit['description'],
			'status'=>$edit['status'],
			'availability'=>$edit['availability'],
			'created'=>strtotime($edit['created_at']),
			'publisher'=>$edit['publisher_name'],
			'tags'=>$tags,
			'assets' => $edit['assets']
		);
	}
	public function validate($empty=false){
		static $validate;
		if(!is_array($validate)){
			$keys=array(
				'pid','vid','title','status','availability','created','publisher','assets'
			);
			$validate=array_fill_keys($keys,false);
		}
		if($empty) return $validate;
		foreach(array_keys($validate) as $key){
			if($this->data[$key]===false){								//print_r($this->data[$key]);
				if(user_access('administer twistal')) drupal_set_message("Unable to validate video, required property  is missing or false");
				return false;
			}
		}
		return true;
	}
}