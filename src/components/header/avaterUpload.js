import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utiles';
import { updateUserMessage } from '../../connect/index';

function AvaUploadFun(props) {
  const { AvatorComponent, listNum, fileList, setFileList } = props;
  const [showFileList, setShowFileList] = useState([...fileList]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };
  /**
   * 限制file的大小和类型
   * @param {*} file
   */
  const handleBeforeUpload = (file) => {
    console.log(typeof file);
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/pif';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG/PIF file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    if (isJpgOrPng && isLt2M) {
      setFileList([...fileList, file]);
      setShowFileList([...fileList, file]);
    }

    return false;
  };
  const onRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    setShowFileList(newFileList);
  };
  const handleChange = (info) => {
    setShowFileList([...info.fileList]);
  };
  console.log(fileList);
  return (
    <AvatorComponent
      previewVisible={previewVisible}
      setPreviewVisible={setPreviewVisible}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      showFileList={showFileList}
      handleCancel={handleCancel}
      handlePreview={handlePreview}
      handleChange={handleChange}
      listNum={listNum}
      onRemove={onRemove}
      handleBeforeUpload={handleBeforeUpload}
    />
  );
}
/**
 *
 * @param {*} props
 */
function AvaUpload(props) {
  const {
    previewVisible,
    previewImage,
    showFileList,
    handleCancel,
    handlePreview,
    handleChange,
    handleBeforeUpload,
    listNum,
    onRemove,
  } = props;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className='ant-upload-text'>Upload</div>
    </div>
  );
  return (
    <div className='clearfix'>
      <Upload
        listType='picture-card'
        fileList={showFileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={handleBeforeUpload}
        onRemove={onRemove}
      >
        {showFileList.length >= listNum ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt='avater' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}
export default function AvaterUpload(props) {
  const { fileListt, setFileListt, listNum } = props;
  return (
    <AvaUploadFun
      AvatorComponent={AvaUpload}
      listNum={listNum || 1}
      fileList={fileListt}
      setFileList={setFileListt}
    />
  );
}
