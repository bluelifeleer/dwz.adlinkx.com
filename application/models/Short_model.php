<?php

class Short_model extends CI_Model {
	public function __construct() {
		parent::__construct();
	}

	public function add($data = array()) {
		$this->db->insert('short_code', $data);
		return $this->db->affected_rows() ? true : false;
	}

	public function lists($where = array(), $num = 20, $offset = 0, $sort = 'DESC', $key = 'id', $fileds = array('*')) {

	}

	public function update($where, $data) {

	}

	public function get($where) {

	}

	public function delete($where) {

	}
}