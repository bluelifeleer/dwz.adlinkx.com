<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Short extends CI_Controller {
	private $short_domain = 'https://short.adlinkx.com';
	private $dwz_domain = 'https://dwz.adlinkx.com';
	private $outputmessage = [];
	public function __construct() {
		parent::__construct();
		$this->load->model('short_model');
	}

	public function index() {
		$this->load->view('short/index.html');
	}

	public function generate() {
		$data = [
			'short' => '',
			'invite_code' => $this->session->userdata('code'),
			'link' => '',
			'true_ip' => $_SERVER['REMOTE_ADDR'],
			'proxy_ip' => $_SERVER['HTTP_HOST'],
			'short_full_link' => '',
			'qr_code' => '',
			'timer' => time(),
		];
		$link = trim($this->input->post('link'));
		$identifier = trim($this->input->post('identifier'));
		$isQR = intval($this->input->post('isQR'));
		$data['link'] = $link;
		$data['short'] = isset($identifier) && !empty($identifier) ? $identifier : FN_generate_short();
		$data['short_full_link'] = $this->dwz_domain . '/' . $data['short'];
		$data['qr_code'] = isset($isQR) && !empty($isQR) && $isQR == 1 ? $this->generateQR($data['short_full_link']) : '';
		$addStatus = $this->short_model->add($data);
		if ($addStatus) {
			//将生成的短链信息写入redis中
			$this->myredis->HMSET($data['short'] . ':info', $data);
			$this->myredis->HMSET($data['short'] . ':count', array('numbers' => 0));
			$this->outputmessage = [
				'code' => 0,
				'msg' => 'success',
				'data' => [
					//返回生成的短链接
					'short_url' => $data['short_full_link'],
					//将短链生成二维码并返回
					'QR_code_url' => isset($data['qr_code']) && !empty($data['qr_code']) ? $this->short_domain . '/resources/images/qrcode/' . $data['qr_code'] : '',
				],
			];
		} else {
			$this->outputmessage = [
				'code' => 1,
				'msg' => 'error',
				'data' => '',
			];
		}
		$this->msg->out($this->outputmessage);
	}

	/**
	 * 生成二维码
	 * @param  [type]  $data            [description]
	 * @param  string  $errorLevel      [description]
	 * @param  integer $matrixPointSize [description]
	 * @param  integer $outerFrame      [description]
	 * @param  string  $fileType        [description]
	 * @param  [type]  $fileName        [description]
	 * @return [type]                   [description]
	 */
	private function generateQR($data = array(), $errorLevel = 'M', $matrixPointSize = 5, $outerFrame = 6, $fileType = 'png', $fileName = '') {
		$this->qr->data($data);
		$this->qr->errorLevel($errorLevel);
		$this->qr->matrixPointSize($matrixPointSize);
		$this->qr->outerFrame($outerFrame);
		$this->qr->fileType($fileType);
		$this->qr->fileName(realpath(SAVEPATH) . DIRECTORY_SEPARATOR . 'resources' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'qrcode', !empty($fileName) ? $fileName : time());
		return $this->qr->generateQR();
	}
}