<?php
/******************************************************
 * Project name:   php google API chart
 * Version:       1.0
 * Author:        Tzuly <tzulac@gmail.com>
 * Last modified: 5-nov-2012
 ******************************************************
 * Description of line chart class
 ******************************************************
 * This class can build a google API geo chart using data from a database
 * 
 * Output:
 * - a google API geo chart who can be styled.
 * (https://developers.google.com/chart/interactive/docs/gallery/geochart)
 * 
 *************
 * Use:      *
 *************
 * - instantiate a new geo object, with parameters:
 * A. array with names and types of columns;
 * WARNING: label column must contain geografical names: countries, regions, cities.
 * B. numeric array with data (built with fetch_all method);
 * WARNING: the array must have at least two columns
 * C. html element name (wrapper) where table will be built;
 * - adding options for chart;
 * - render the geo chart with render method;
 */
class geo extends base{
    /**
     * Adding options to line chart
     * https://developers.google.com/chart/interactive/docs/gallery/geochart
     * 
     * backgroundColor, chartArea, fontSize, height, width, legend,
     * title, tooltip, displayMode, etc.
     * 
     * If option value is an object this must be written as string: 
     * {OptionName1:'OptionValue1', OptionName2:'OptionValue2'}
     * 
     * @param string $name - name of configuration option;
     * @param string $value - value of option;
     */
    public function setOptions($name,$value) {
        $this->options[$name]=$value;
    }
    /**
     * Render line chart with options.
     * 
     * @return string
     */
    public function render() {
        $output="<script>";
        $output.="google.load('visualization', '1', {'packages':['geochart']});";
        $output.="google.setOnLoadCallback(function(){";
        $output.=$this->data();
        $option='';
        foreach ($this->options as $key=>$value) {
            $key=  htmlentities($key);
            $value=htmlentities($value);
            if (strpos($value,':')===false) {
                $option.="$key:'".$value."',";
            } else {
                $option.="$key:".$value.",";
            }
        }
        $options=  substr($option, 0, -1);
        $output.="var options={".$options."};";
        $output.="var area = new google.visualization.GeoChart(document.getElementById('".htmlentities($this->div)."'));";
        $output.="area.draw(data,options);";
        $output.="});";
        $output.="</script>";
        return $output;
    }
}