import { ScrollbarWrapper } from '@components/Login/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImagelistCheckbox from './ImagelistCheckbox';
import { Switch } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import axios from 'axios';
import useInput from '@hooks/useInput';

import FileSaver from 'file-saver';

const Container = styled.div`
  width: 760px;
  height: 595px;
  margin: 100px auto;
  position: relative;

  font-family: 'NanumSquareRound';
  padding-left: 25px;
  padding-right: 25px;
  background: url('./image/image_download_pop.png') no-repeat;
  /* background: url('./image/sample.png') no-repeat; */

  #tab_button_wrapper {
    padding-top: 72px;
    margin-bottom: 52px;
    width: 100%;
    li {
      font-size: 12px;
      font-weight: 800;
      float: left;
      padding: 0.8px 14px;
      border: 1.8px solid rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      color: #c4c4c4;
      margin: 0 4px;
      /* cursor: pointer; */
    }
    li:first-child {
      margin-left: 0;
    }
    li.on {
      border: 1.8px solid rgba(0, 187, 157, 0.6);
      color: rgb(0, 187, 157);
    }
  }
  #image_download_contents {
    display: flex;
    flex-direction: column;
    height: 442px;
    flex-wrap: wrap;
    position: relative;
  }
  .download_pop_sub {
    margin-right: 15px;
    .image_download_content {
      width: 100%;
      padding-top: 6.8px;
      #image_list_table {
        #table_col_name {
          height: 29px;
          letter-spacing: 0;
          font-weight: 500;
          background: #eeeeee;
          border-radius: 6px 6px 0px 0px;
        }

        .table_common_attr {
          font-size: 9px;
          letter-spacing: -1px;
          line-height: 29px;
          width: 100%;
          height: 27px;
          text-align: center;
          overflow: hidden;
          li {
            float: left;
            height: 27px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          li:first-child {
            width: 51px;
          }
          li:nth-child(2) {
            width: 50px;
          }
          li:nth-child(3) {
            width: 39px;
          }
          .checkbox_li {
            width: 26px;
            position: relative;
            .listcheckbox {
              width: 12px;
              height: 12px;
              border: 1px solid #dcdcdc;
              border-radius: 2px;
              position: absolute;
              top: 8px;
              left: 50%;
              margin-left: -6px;
              cursor: pointer;
            }
            .listcheckbox:after {
              border: 1px solid #fff;
              border-top: none;
              border-right: none;
              content: '';
              height: 3px;
              left: 2px;
              opacity: 0;
              position: absolute;
              top: 2.5px;
              transform: rotate(-45deg);
              width: 6px;
            }
            input[type='checkbox'] {
              visibility: hidden;
            }

            input[type='checkbox']:checked + .listcheckbox {
              background-color: rgba(0, 187, 157, 0.6);
              border-color: rgba(0, 187, 157, 0.6);
            }

            input[type='checkbox']:checked + .listcheckbox:after {
              opacity: 1;
            }
          }
        }
      }
    }
  }
  #image_list_wrapper {
    width: 185px;
    height: 442px;
  }
  .download_pop_title {
    span {
      font-size: 11px;
    }
    img {
      margin-top: 2px;
      margin-right: 5px;
    }
  }
  #preview_wrapper {
    width: 236px;
    height: 297px;
    overflow: hidden;
    border-radius: 0 0 5px 5px;
    position: relative;
    .preview_img_loading {
      width: 100%;
      height: 100%;
      /* background: pink; */
      position: absolute;
      top: 0;
    }

    .preview_img_box {
      width: 100%;
      overflow: hidden;
      border-radius: 5px;
      img {
        width: 100%;
      }
    }
  }
  #infomation_wrapper {
    margin-top: 8px;
    width: 236px;
    height: 137px;
    .image_download_content {
      width: 100%;
      height: 106px;
      border-radius: 5px;
      margin-top: 9px;
      background: #f8f8f8;
      font-size: 9px;
      padding: 11px 17px;
      li {
        height: 18px;
      }
      .info_key {
        width: 49px;
        float: left;
      }
      .info_value {
        margin-left: 8px;
      }
    }
  }
  #select_option_wrapper {
    width: 259px;
    /* height: 442px; */
    height: 394px;
    margin-right: 0;
  }
  #image_list_table_content {
    overflow-y: scroll;
    height: 384.5px;
    background: #f8f8f8;
    &::-webkit-scrollbar {
      width: 13px;
      border-radius: 5px;
      background-color: #e7e7e7;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #cbcaca;
      border-radius: 5px;
    }
    .table_common_attr {
      cursor: pointer;
    }
    .table_common_attr.on {
      background-color: rgba(0, 187, 157, 0.4);
    }
  }
  .select_option_content {
    height: 364px;
    border-radius: 5px;
    background: #f8f8f8;
    .option_list_wrapper {
      font-size: 10px;
      li {
        width: 100%;
        height: 37px;
        line-height: 37px;
        padding: 0 10px;
      }
      li span {
        float: left;
        margin-right: 5px;
      }
      .select_option_switch {
        float: right;
        .antd_switch.ant-switch-checked {
          background-color: rgb(0, 187, 157);
        }
        select::-ms-expand {
          display: none;
        }
        .select {
          -o-appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .select_box {
          width: 90px;
          height: 35px;
          background: url('./image/drop_down.png') center right no-repeat;
          border-bottom: 1px solid #b9b9b9;
        }
        .select_box .select {
          width: 90px;
          height: 30px;
          background: transparent;
          border: 0 none;
          outline: 0 none;
          text-align: center;
          padding-right: 6px;
        }
        .select_box .select option {
          font-size: 9px;
          border-bottom: 1px solid black;
        }
      }
    }
  }
  .image_download_button_common {
    width: 260px;
    height: 31px;
    border-radius: 5px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  #image_download_button {
    background: #00bb9d;
    text-align: center;
    line-height: 31px;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
    color: white;
  }
  #image_download_loading {
    background: #b7b7b7;
  }
  .loader-wrapper {
    .loader {
      position: absolute;
      width: 18px;
      height: 18px;
      top: 50%;
      left: 50%;
      margin-left: -9px;
      margin-top: -9px;
      border: 4px solid #f8f8f8;
      border-radius: 50%;
      border-top: 4px solid #00bb9d;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
    }
    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  #down_pop_close_btn {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    right: 15px;
    cursor: pointer;
  }
`;

export default function ImageDownloadPop({ setDownpop }) {
  const myImageSelectedList = useSelector((state: RootState) => state.myimage.imageList?.filter((img) => img.select));
  const [editedData, setEditedData] = useState([] as any);
  const allcheckInput = useRef<HTMLInputElement>(null);
  const [infoTarget, setInfoTarget] = useState(0);
  const [downloadLoading, setDownloadLoading] = useState(0);
  const [previewLoading, setPreviewLoading] = useState(true);
  const [selectedListEdition, setSelectedListEdition] = useState([] as any);
  const previewImg = useRef<HTMLImageElement>(null);
  const [caption, setCaption] = useState(false);

  /* 
  Get a myImageSelectedList from the store and reprocess it into usable data
  => Duplicate data from the same image according to the type of service (ex. origin, ndvi)
  */
  useEffect(() => {
    if (myImageSelectedList) {
      // console.log(myImageSelectedList);
      const dupleSelectedList = [] as any;
      myImageSelectedList.forEach((el) => {
        el.select_service.forEach((service) => {
          const dupleData = { ...el };
          dupleData.newType = service;
          dupleSelectedList.push(dupleData);
        });
      });
      if (dupleSelectedList.length) {
        setSelectedListEdition(dupleSelectedList);
        // console.log(dupleSelectedList);
      }
    }
  }, []);

  /* 
  Data processing to be used inside the download pop-up according to the image list selected in My Page
  */
  useEffect(() => {
    if (selectedListEdition.length) {
      const data = selectedListEdition.map((el) => {
        const elImgInfoType = el.newType === 'sr' ? el.sr_info : el.image_info;
        // console.log(elImgInfoType);
        const typeCheck = () => {
          if (el.newType !== 'origin') {
            return el.newType.toUpperCase();
          } else {
            if (elImgInfoType.satellite === 'ICEYE') {
              return 'SAR';
            } else if (elImgInfoType.satellite === 'GHGSat-C2') {
              return 'METHANE';
            } else {
              return 'RGB';
            }
          }
        };
        const cloudCheck = () => {
          if (typeof elImgInfoType.cloud_ratio === 'undefined') {
            return '-';
          } else if (elImgInfoType.cloud_ratio <= 10) {
            return `./icon/cloud/cloud_0.svg`;
          } else if (elImgInfoType.cloud_ratio <= 50) {
            return `./icon/cloud/cloud_33.svg`;
          } else if (elImgInfoType.cloud_ratio <= 90) {
            return `./icon/cloud/cloud_66.svg`;
          } else if (elImgInfoType.cloud_ratio >= 90) {
            return `./icon/cloud/cloud_100.svg`;
          }
        };
        const editDate = () => {
          const year = el.image_info.kst_date.substring(2, 4);
          const month = el.image_info.kst_date.substring(5, 7);
          const day = el.image_info.kst_date.substring(8, 10);
          return `${year}/${month}/${day}`;
        };
        const substrPath = () => {
          const path = elImgInfoType.image_path;
          return path ? path.substring(15) : '';
        };
        return {
          id: `${el.image_idx}_${typeCheck()}`,
          idx: el.newType === 'sr' ? [elImgInfoType.idx, el.image_idx] : el.image_idx,
          imgsrc: elImgInfoType.thumbnail[el.newType],
          location: el.image_info.location.length ? el.image_info.location : '-',
          mainType: el.newType,
          type: typeCheck(),
          satellite: elImgInfoType.satellite,
          date: editDate(),
          cloud: `${elImgInfoType.cloud_ratio.toFixed(2)}%`,
          cloudimgsrc: cloudCheck(),
          path: substrPath(),
        };
      });
      setEditedData(data);
    }
  }, [selectedListEdition]);

  /*
  To change checkboxes on the download popup to checked state 
  */
  const [checkedList, setCheckedLists] = useState([] as any);
  const onCheckedAll = useCallback(
    (e) => {
      if (editedData.length) {
        if (e.target.checked) {
          const checkedListArray = [] as any;
          editedData.forEach((list) => checkedListArray.push(list));
          setCheckedLists(checkedListArray);
        } else {
          setCheckedLists([]);
        }
      }
    },
    [checkedList, editedData],
  );
  const onCheckedElement = useCallback(
    (e, list) => {
      // e.stopImmediatePropagation();
      if (e.target.checked) {
        setCheckedLists([...checkedList, list]);
      } else {
        setCheckedLists(checkedList.filter((el) => el.id !== list.id));
      }
    },
    [checkedList],
  );
  useEffect(() => {
    if (editedData.length) {
      const checkedListArray = [] as any;
      editedData.forEach((list) => checkedListArray.push(list));
      setCheckedLists(checkedListArray);
    }
  }, [editedData]);
  /* 
  Click the download button inside the download pop-up to download the image
   */
  const DownloadURI = useCallback(
    (uri: string, name: string, ext: string) => {
      if (ext === 'tif') {
        if (caption) alert('tif 파일은 Caption 없이 다운로드 됩니다.');
        setTimeout(() => {
          window.open(uri, '_blank');
          setDownloadLoading((prev) => prev - 1);
        }, 100);
      } else {
        if (caption) {
          const imageUrl = uri;
          axios
            .post('https://ogj7yapubj.execute-api.ap-northeast-2.amazonaws.com/addWatermark/addWatermark', JSON.stringify({ imageUrl }))
            .then((response) => {
              const decode = Buffer.from(response.data, 'base64');
              // console.log(decode);
              FileSaver.saveAs(new Blob([decode]), name);
              setDownloadLoading((prev) => prev - 1);
            });
        } else {
          axios({
            url: uri,
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            // console.log(response.data);
            FileSaver.saveAs(new Blob([response.data]), name);
            setDownloadLoading((prev) => prev - 1);
          });
        }
      }
    },
    [caption],
  );
  const [imgFormat, onChangeImgFormat] = useInput('png');

  const onDownloadImage = useCallback(() => {
    if (checkedList.length) {
      const confirmImgFormat = (type, imgFormat) => (type === 'NDVI' && imgFormat === 'tif' ? 'png' : imgFormat);
      // const confirmType = (maintype) => (maintype === 'sr' ? 'origin' : maintype);

      const reqListData = checkedList.map((list) => [list.idx, list.path, confirmImgFormat(list.type, imgFormat), list.mainType]);
      // const list = reqListData.map((item) => JSON.stringify(item));
      const jsonbody = {
        'image-list': reqListData,
      };
      // console.log(jsonbody);
      axios
        .post('https://50zlv29f2e.execute-api.ap-northeast-2.amazonaws.com/dev/ep_user_download', jsonbody)
        .then(async (response) => {
          // console.log(response.data);
          if (response.status === 200) {
            setDownloadLoading(response.data.length);
            response.data.map((data) => DownloadURI(data[1], `${data[0]}_${data[2]}.${data[3]}`, data[3]));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [checkedList, imgFormat, caption]);

  /* 
  Image list activation event inside download popup
   */
  const currentUlId = useRef('0');
  const onActive = useCallback((e) => {
    e.stopPropagation();
    const onIndex = e.currentTarget.getAttribute('id');
    if (currentUlId.current !== onIndex) {
      [].forEach.call(document.getElementsByClassName('down_image_list'), (el: HTMLUListElement) => {
        el.classList.remove('on');
      });
      e.currentTarget.classList.add('on');
      if (previewImg.current) previewImg.current.src = '';
      setPreviewLoading(true);
      currentUlId.current = onIndex;
    }
    setInfoTarget(onIndex);
  }, []);

  const onChangeCaption = useCallback((checked) => {
    setCaption(checked);
  }, []);

  return (
    <ScrollbarWrapper>
      <Container>
        <ul id="tab_button_wrapper" /* onClick={onClickTab} */>
          <li className="on">Basic</li>
          {/* <li>Analytical</li>
          <li>High-res print</li> */}
        </ul>
        <div id="image_download_contents">
          <div id="image_list_wrapper" className="download_pop_sub">
            <div className="download_pop_title">
              <img src="./image/list_icon.png" alt="image list icon" />
              <span>Image List</span>
            </div>
            <div className="image_download_content">
              <div id="image_list_table">
                <ul id="table_col_name" className="table_common_attr">
                  <li>Date</li>
                  <li>Location</li>
                  <li>Type</li>
                  <li className="checkbox_li">
                    <input
                      ref={allcheckInput}
                      type="checkbox"
                      id="cb_default"
                      onChange={onCheckedAll}
                      checked={checkedList.length === 0 ? false : checkedList.length === selectedListEdition?.length ? true : false}
                    />
                    <label htmlFor="cb_default" className="listcheckbox"></label>
                  </li>
                </ul>
                <div id="image_list_table_content">
                  {editedData.length &&
                    editedData.map((list, idx) => (
                      <ImagelistCheckbox
                        index={idx}
                        id={`cd${idx}`}
                        key={list.id}
                        date={list.date}
                        location={list.location}
                        type={list.type}
                        onChecked={(e) => onCheckedElement(e, list)}
                        check={checkedList.some((el) => el.id === list.id) ? true : false}
                        onActive={onActive}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div id="preview_wrapper" className="download_pop_sub">
            <div className="download_pop_title">
              <img src="./image/preview_icon.png" alt="preview icon" />
              <span>Preview</span>
            </div>
            <div className="image_download_content">
              {editedData.length && (
                <>
                  <div className="preview_img_box">
                    <img
                      ref={previewImg}
                      src={editedData[infoTarget].imgsrc}
                      alt={`${editedData[infoTarget].type} preview image`}
                      onLoad={() => {
                        setPreviewLoading(false);
                      }}
                      onError={() => {
                        console.log('이미지 없음');
                        setPreviewLoading(false);
                      }}
                    />
                  </div>
                  {previewLoading && (
                    <div className="preview_img_loading loader-wrapper">
                      <div className="loader"></div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div id="infomation_wrapper" className="download_pop_sub">
            <div className="download_pop_title">
              <img src="./image/info_icon.png" alt="infomation icon" />
              <span>Infomation</span>
            </div>
            <div className="image_download_content">
              {editedData.length && (
                <ul>
                  <li>
                    <span className="info_key">Date</span> : <span className="info_value">{editedData[infoTarget].date}</span>
                  </li>
                  <li>
                    <span className="info_key">Location</span> :{' '}
                    <span className="info_value">
                      {typeof editedData[infoTarget].location === 'string'
                        ? editedData[infoTarget].location
                        : editedData[infoTarget].location[1]}
                    </span>
                  </li>
                  <li>
                    <span className="info_key">Cloud</span>:
                    <span className="info_value">
                      {editedData[infoTarget].cloud === 'undefined' ||
                      editedData[infoTarget].satellite === 'ICEYE' ||
                      editedData[infoTarget].satellite === 'GHGSat-C2' ? (
                        <>&ensp;-</>
                      ) : (
                        <>
                          <img src={editedData[infoTarget].cloudimgsrc} alt="cloud ratio image" />
                          &ensp;{editedData[infoTarget].cloud}
                        </>
                      )}
                    </span>
                  </li>
                  <li>
                    <span className="info_key">Satellite</span> : <span className="info_value">{editedData[infoTarget].satellite}</span>
                  </li>
                  <li>
                    <span className="info_key">Type</span> : <span className="info_value">{editedData[infoTarget].type}</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div id="select_option_wrapper" className="download_pop_sub">
            <div className="download_pop_title">
              <img src="./image/option_icon.png" alt="infomation icon" />
              <span>Select Option</span>
            </div>
            <div className="image_download_content">
              {/* {liIndex && <div className="select_option_content">{liIndex}</div>} */}
              <div className="select_option_content">
                <ul className="option_list_wrapper">
                  <li>
                    <span>Caption</span>
                    <img src="./image/question_mark.png" alt="question mark" />
                    <div className="select_option_switch">
                      OFF&emsp;
                      <Switch className="antd_switch" size="small" onChange={onChangeCaption} />
                      &emsp;ON
                    </div>
                  </li>
                  <li>
                    <span>Map Overlay</span>
                    <img src="./image/question_mark.png" alt="question mark" />
                    <div className="select_option_switch">
                      OFF&emsp;
                      <Switch className="antd_switch" size="small" />
                      &emsp;ON
                    </div>
                  </li>
                  <li>
                    <span>Save Format</span>
                    <img src="./image/question_mark.png" alt="question mark" />
                    <div className="select_option_switch">
                      <div className="select_box">
                        <select name="items1" className="select" onChange={onChangeImgFormat}>
                          <option value="png">PNG</option>
                          <option value="jpg">JPEG</option>
                          <option value="tif">TIFF(16-bit)</option>
                        </select>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {downloadLoading <= 0 ? (
            <div className="image_download_button_common" id="image_download_button" onClick={onDownloadImage}>
              Download
            </div>
          ) : (
            <div className="image_download_button_common loader-wrapper" id="image_download_loading">
              <div className="loader"></div>
            </div>
          )}
        </div>
        <div id="down_pop_close_btn" onClick={setDownpop}></div>
      </Container>
    </ScrollbarWrapper>
  );
}
