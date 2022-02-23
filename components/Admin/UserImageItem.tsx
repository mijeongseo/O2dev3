import React from 'react';
import { MyimageInfo } from 'store/modules/myimage/types';
import { UserImageItemDiv } from './style';

type UserImageItemProps = {
  image: MyimageInfo;
  service: string;
}

const sr_status = ['Ready', 'Request', 'Processing', 'Reject', 'Done'];

function UserImageItem ({ image, service }: UserImageItemProps) {

  const selectRef = React.useRef<HTMLSelectElement>(null);

  const onClickHandler = (e: React.SyntheticEvent) => {
    console.log(e)
    console.log(image.image_idx)
    console.log(image.email)
    console.log(selectRef.current?.selectedIndex)
  }

  return (
    <UserImageItemDiv>
      <div className="email">{image.email}</div>
      <div className="image_idx">{image.image_idx}</div>
      <div className="service">{service}</div>
      <div className="sr">{service === 'origin' ? sr_status[image.sr] : null}</div>
      <div className="sr">
        {
          service === 'origin' ? 
            <select ref={selectRef}>
              {sr_status.map((status, idx) => {
                return (
                  <option key={idx} value={idx} selected={image.sr === idx}>{status}</option>
                )
              })}
            </select>
          :
            "-"
        }
      </div>
      <div>
        <button onClick={onClickHandler}>change</button>
      </div>
    </UserImageItemDiv>
  )
}

export default React.memo(UserImageItem);