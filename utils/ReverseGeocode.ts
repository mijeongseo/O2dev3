import Geocode from 'react-geocode';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';

// Geocode 관련 설정
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLanguage('en');
Geocode.enableDebug();

/*----------------------------------------------------------
 * Address
 *---------------------------------------------------------*/
const ReverseGeocode = async (center: number[]) => {
  return Geocode.fromLatLng(center[1].toString(), center[0].toString())
    .then((response) => {
      if (!response.results[response.results.length - 1].types.includes('plus_code')) {
        return response.results[response.results.length - 1].formatted_address;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export default ReverseGeocode;
