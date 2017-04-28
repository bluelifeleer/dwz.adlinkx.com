<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Msg {
	private $CI;
	public function __construct() {
		$this->CI = &get_instance();
	}

	public function out($msg = array(), $msg_type = 'application/json', $charset = 'utf-8') {
		$this->CI->output
			->set_content_type($msg_type, $charset)
			->set_output(json_encode($msg));
	}
}