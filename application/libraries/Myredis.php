<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
|------------------------------------------------------------------------
| Redis class library
|------------------------------------------------------------------------
| Author bluelife
| Email thebuleife@outlook.com
| date 2017-03-16
|------------------------------------------------------------------------
 */
class Myredis extends Redis {
	private $CI;
	public function __construct() {
		parent::__construct();
		$this->CI = &get_instance();
		$this->connection();

	}

	private function connection() {
		$this->connect($this->CI->config->item('redis')['host'], $this->CI->config->item('redis')['port']);
		if (isset($this->CI->config->item('redis')['auth']) && !empty($this->CI->config->item('redis')['auth'])) {
			$this->AUTH($this->CI->config->item('redis')['auth']);
		}
		$this->SELECT($this->CI->config->item('redis')['select']);
	}
}