<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InviteCode extends CI_Controller {
	private $outputmessage = [];
	public function __construct() {
		parent::__construct();
		$this->load->model('invite_model', 'invite');
	}

	public function verification() {
		$inviteCode = $this->input->post('inviteCode');
		$result = $this->invite->get(array('code' => $inviteCode, 'is_del' => 0));
		if (is_array($result) && !empty($result)) {
			//判断使用次数
			if (intval($result['use_num']) <= 5) {
				$updata = array('use_num' => intval($result['use_num']) + 1);
				$where = array('code' => $result['code'], 'user_id' => $result['user_id']);
				$this->invite->update($where, $updata);
				//保存session中
				unset($result['use_num']);
				$this->session->set_userdata($result);
				$this->outputmessage = [
					'code' => 0,
					'msg' => '校验通过',
					'data' => '',
				];
			} else {
				$this->outputmessage = [
					'code' => 1,
					'msg' => '使用次数已达上限',
					'data' => '',
				];
			}
		} else {
			$this->outputmessage = [
				'code' => 1,
				'msg' => '您的邀请码不存在',
				'data' => '',
			];
		}
		$this->msg->out($this->outputmessage);
	}
}