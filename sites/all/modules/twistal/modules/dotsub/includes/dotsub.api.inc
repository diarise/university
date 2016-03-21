<?php

class DotsubApi{
	public $settings;
	public function __construct($ref=null, $params=array()){
		$this->settings=array_merge(_dotsub_settings(),$params);
		$this->user=$this->settings['user'];
		$this->ref=$ref;
	}
	public function fetchTranscript($lang){
		$data=json_decode(@file_get_contents($this->getDotsubCaptionURL($lang)));
		if(!is_object($data)) return array();
		foreach($data->captions as $caption){
			$seconds=$caption->startTime/1000;
			$hours = floor($seconds / 3600);
			$mins = floor(($seconds - ($hours*3600)) / 60);
			$secs = floor($seconds - ($hours*3600) - ($mins*60));
			$captions.=' <span class="transcript-time" id="transcript-'.$seconds.'-'.($caption->duration/1000).'" style="cursor:pointer;" >'.$caption->content.'</span>';
		}
		return $captions;
	}
	public function getDotsubMeta(){
		static $meta;
		if(isset($meta[$this->ref])) return $meta[$this->ref];
		$meta[$this->ref]=json_decode(@file_get_contents('http://www.dotsub.com/api/user/'.$this->user.'/media/'.$this->ref.'/metadata'));
		return $meta[$this->ref];
	}
	public function getLanguages($default=false){
		static $langs;
		if(is_array($langs)) return $langs;
		$meta=$this->getDotsubMeta();	
		if(!is_object($meta)) return array();
		$default=isset($this->settings['default_language'])?$this->settings['default_language']:false;
		foreach($meta->languages as $language){
			if($language->workflowStatus=='PUBLISHED'){
				if($default && $default==$language->languageCode) $first=$language->languageName;
				else $langs[$language->languageCode]=$language->languageName;
			}
		}
		if($default) $langs=array_merge(array($default=>$first),$langs);
		return $langs;
	}	
	public function getLanguagesForCron($default=false){
		static $langs;
		//if(is_array($langs)) return $langs;
		$meta=$this->getDotsubMeta();
		if(!is_object($meta)) return array();
		$default=isset($this->settings['default_language'])?$this->settings['default_language']:false;
		foreach($meta->languages as $language){
			if($language->workflowStatus=='PUBLISHED'){
				if($default && $default==$language->languageCode) $first=$language->languageName;
				else $langs[$language->languageCode]=$language->languageName;
			}
		}
		if($default) $langs=array_merge(array($default=>$first),$langs);
		return $langs;
	}
	
	public function getDotsubCaptionURL($lang){
		return 'http://www.dotsub.com/api/user/'.$this->user.'/media/'.$this->ref.'/captions?language='.$lang;
	}
	public function getDotsubCaption($lang,$format='vtt'){
		$func=($this->settings['cache']<1)?'formatCaption':($this->hasCache($lang,$format))?'getCache':'setCache';
		exit(file_get_contents('http://www.dotsub.com/media/u/'.$this->user.'/'.$this->ref.'/c/'.$lang.'/'.$format));
		exit($this->$func($lang,$format));
	}
	public function loadDotsubCaptions(){
		$meta=$this->getDotsubMeta();
		if(!is_object($meta)) return array();
		$captions=array();
		$i=1;
		if(!isset($this->settings['default_language'])) $this->settings['default_language']='';
		foreach($meta->languages as $language){
			
			if($language->workflowStatus=='PUBLISHED'){
				$caption=array(
					'file' => '/twistal/dotsub/captions/'.$this->ref.'/'.$language->languageCode.'.vtt',
					'label' => $language->languageName,
				);
				if($this->settings && $language->languageCode==$this->settings['default_language']){
					if($this->settings['autostart_subtitles']) $caption['autostart']=1;
					if($this->settings['autostart_transcript']) $caption['abbr']=$language->languageCode;
					array_unshift($captions,$caption);
				}else{
					$captions[]=$caption;
				}
				$i++;
			}
		}
		return empty($captions)?false:$captions;
	}
	public function cachePath($lang,$format){
		if(!is_dir(file_directory_path().$this->settings['cache_destination'])){
			mkdir(file_directory_path().$this->settings['cache_destination'],0777);
		}
		return file_directory_path().$this->settings['cache_destination'].'/'.$this->ref.'_'.$lang.'.'.$format;
	}
	public function hasCache($lang,$format){
		return file_exists($this->cachePath($lang,$format));
	}
	public function getCache($lang,$format){
		return file_get_contents($this->cachePath($lang,$format));
	}
	public function setCache($lang,$format){
		$formatted=$this->formatCaption($lang,$format);
		$put=file_put_contents($this->cachePath($lang,$format),$formatted,LOCK_EX);
		//$put=file_save_data($formatted, $this->cachePath($lang,$format), FILE_EXISTS_REPLACE);
		if(!$put) dump_pre('could not put');
		return $formatted;
	}
	public function formatCaption($lang,$format){
		$orig=json_decode(file_get_contents($this->getDotsubCaptionURL($lang)));
		$contents=false;
		if(function_exists('dotsub_format_'.$format)){
			$contents=call_user_func('dotsub_format_'.$format,$orig);
		}
		return $contents;
	}
}

function dotsub_format_vtt($captions){
	$nl="\r\n";
	$text='WEBVTT'.$nl.$nl;
	foreach($captions->captions as $caption){
		$startSec=$caption->startTime/1000;
		$smin=floor($startSec/60);
		if(strlen($smin)<2) $smin='0'.$smin;
		$ssec=round($startSec%60);
		if(strlen($ssec)<2) $ssec='0'.$ssec;
		$start=$smin.':'.$ssec.'.000';

		$finSec=($caption->startTime+$caption->duration)/1000;
		$fmin=floor($finSec/60);
		if(strlen($fmin)<2) $fmin='0'.$fmin;
		$fsec=round($finSec%60);
		if(strlen($fsec)<2) $fsec='0'.$fsec;
		$fin=$fmin.':'.$fsec.'.000';
		
		$text.=$start.' --> '.$fin.$nl.$caption->content.$nl.$nl;
	}
	return($text);
}