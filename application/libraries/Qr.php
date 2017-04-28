<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'phpqrcode' . DIRECTORY_SEPARATOR . 'qrlibs.php';

class Qr {
	private $CI;
	private $data;
	private $errorLevel = 'L';
	private $fileName;
	private $matrixPointSize = 4;
	private $outerFrame = 2;
	private $fileType = 'png';
	private $save_dir = '/temp';

	public function __construct() {
		$this->CI = &get_instance();
	}

	public function generateQR() {
		switch ($this->fileType) {
		case 'jpg':
			QRcode::jpg($this->data, $this->saveDir . DIRECTORY_SEPARATOR . $this->fileName, $this->errorLevel, $this->matrixPointSize, 100);
			return $this->fileName;
			break;
		default:
			QRcode::png($this->data, $this->saveDir . DIRECTORY_SEPARATOR . $this->fileName, $this->errorLevel, $this->matrixPointSize, 2);
			return $this->fileName;
			break;
		}
		// QRtools::timeBenchmark();
	}

	public function data($data) {
		$this->data = $data;
	}

	public function errorLevel($errorLevel) {
		$this->errorLevel = $errorLevel;
	}

	public function fileName($saveDir, $fileName) {
		$this->saveDir = $saveDir;
		$this->fileName = date('YmdHis', time()) . md5($this->data . '|' . $this->errorLevel . '|' . $this->matrixPointSize . '|' . $fileName) . '.' . $this->fileType;
	}

	public function matrixPointSize($matrixPointSize) {
		$this->matrixPointSize = $matrixPointSize;
	}

	public function outerFrame($outerFrame) {
		$this->outerFrame = $outerFrame;
	}

	public function fileType($fileType) {
		$this->fileType = $fileType;
	}
}