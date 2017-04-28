<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Invite_model extends CI_Model {
	public function __construct() {
		parent::__construct();
	}

	public function get($where = array()) {
		$this->db->select('code,user_id,use_num');
		$this->db->from('invite_code');
		$this->db->where($where);
		$query = $this->db->get();
		$result = $query->row_array();
		return $query->num_rows() > 0 && !empty($result) ? $result : array();
	}

	public function add($data = array()) {

	}

	public function lists($where = array(), $num = 20, $offset = 0, $key = 'id', $sort = 'DESC', $fields = array('*')) {

	}

	public function update($where = array(), $data = array()) {
		$this->db->update('invite_code', $data, $where);
		return $this->db->affected_rows() ? true : false;
	}

	public function delete($where = array()) {

	}
}