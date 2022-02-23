import moment from 'moment';
import { ImageInfo, ImageListInfo, locationJsonInfo } from 'store/modules/searchResult/types';

export const setDigits = (value: number) => {  
  return `${value >= 10 ? value : '0' + value}`;
};

export const setImageInfo = ({ idx, image, internal } : { idx?: number, image: ImageInfo, internal: boolean }) => {
  if (!internal) {
    image.idx = idx!;
    image.kst_date = moment.utc(new Date(image.image_timestamp), 'YYYY-MM-DD HH:mm:ss').local().format("YYYY-MM-DD HH:mm:ss");
  }
  else {
    image.kst_date = moment.utc(`${image.image_date![0]}-${setDigits(image.image_date![1])}-${setDigits(image.image_date![2])} ${setDigits(image.image_date![3])}:${setDigits(image.image_date![4])}:${setDigits(image.image_date![5])}`, 'YYYY-MM-DD HH:mm:ss').local().format("YYYY-MM-DD HH:mm:ss");
  }
  image.select = false;
  image.services ? image.services.unshift('origin') : image.services = ['origin'];
  image.service = [];
  image.internal = internal;

  return image;
}

const SearchImageInfo = (data: any) => {
  
  // console.log(data)
  const service: { [key: string]: number } = {'origin': data.s3o_count + data.s3x_count};
  const externalImageList: ImageInfo[] = data.s3x_list;
  const externalLocationJsonList: locationJsonInfo[] = [];
  let number: number = 0;

  externalImageList.map(image => {
    
    // image.idx = number;
    // image.select = false;
    // image.services = ['origin'];
    // image.service = [];
    // image.kst_date = moment.utc(new Date(image.image_timestamp), 'YYYY-MM-DD HH:mm:ss').local().format("YYYY-MM-DD HH:mm:ss");
    // image.internal = false;
    image = setImageInfo({ idx: number, image, internal: false });

    externalLocationJsonList.push({
      idx: image.idx,
      bounds: image.bounds,
      internal: image.internal, 
    });

    number++;

    return image;
  })

  const internalImageList: ImageInfo[] = data.s3o_list;
  const internalLocationJsonList: locationJsonInfo[] = [];

  internalImageList.map(image => {    
    image.services && image.services.forEach(e => {
      if(typeof(service[e]) == 'undefined') service[e] = 1;
      else service[e]++;
    });

    // image.select = false;
    // image.services ? image.services.unshift('origin') : image.services = ['origin'];
    // image.service = [];
    // image.kst_date = moment.utc(`${image.image_date![0]}-${setDigits(image.image_date![1])}-${setDigits(image.image_date![2])} ${setDigits(image.image_date![3])}:${setDigits(image.image_date![4])}:${setDigits(image.image_date![5])}`, 'YYYY-MM-DD HH:mm:ss').local().format("YYYY-MM-DD HH:mm:ss");
    // image.internal = true;

    image = setImageInfo({ image, internal: true });

    internalLocationJsonList.push({
      idx: image.idx,
      bounds: image.bounds,
      internal: image.internal, 
    });

    return image;
  })

  const result: ImageListInfo = {
    result: true,
    service: service,
    count: data.s3o_count + data.s3x_count,
    // images: internalImageList.concat(externalImageList).sort((a, b) => {return a.image_timestamp - b.image_timestamp}),
    images: internalImageList.concat(externalImageList),
    locationJsonList: internalLocationJsonList.concat(externalLocationJsonList),
    selectImage: null
  }

  return result;
};

export default SearchImageInfo;
