import moment from "moment";
import { MyimageInfo, MyimageState } from "store/modules/myimage/types";
import { locationJsonInfo } from "store/modules/searchResult/types";
import { setDigits } from "./SearchImageInfo";

const UserImageList =  (response: any) => {

  const list: MyimageInfo[] = response.data.Items;
  const locationJsonList: locationJsonInfo[] = [];
  let count = 0;
  let sr_count = 0;
  let sr_process_count = 0;

  list.map(image => {
    
    count += image.service.length;
    image.sr !== 0 ? sr_count += 1 : null;
    image.sr === 1 || image.sr === 2 ? sr_process_count += 1 : null;

    image.select = false;
    image.select_service = [];

    image.image_info.services.unshift('origin');
    image.image_info.kst_date = moment.utc(`${image.image_info.image_date![0]}-${setDigits(image.image_info.image_date![1])}-${setDigits(image.image_info.image_date![2])} ${setDigits(image.image_info.image_date![3])}:${setDigits(image.image_info.image_date![4])}:${setDigits(image.image_info.image_date![5])}`, 'YYYY-MM-DD HH:mm:ss').local().format("YYYY-MM-DD HH:mm:ss");
    image.image_info.cloud_ratio = image.image_info.cloud_ratio ? parseFloat(image.image_info.cloud_ratio.toString()) : 0;
    
    locationJsonList.push({
      idx: image.image_info.idx,
      bounds: image.image_info.bounds,
      internal: true, 
    });
  })

  const result: MyimageState = {
    count: count,
    sr_count: sr_count,
    sr_process_count: sr_process_count, 
    imageList: list,
    locationJsonList: locationJsonList,
    selectMyImage: null,
    imageOpacity: null
  }

  return result;
}

export default UserImageList;