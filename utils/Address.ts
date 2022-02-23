import Geocode from 'react-geocode';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';

// Geocode 관련 설정
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLanguage('en');
Geocode.enableDebug();

/*----------------------------------------------------------
 * Address
 *---------------------------------------------------------*/
const Address = async (addr: string) => {
  return Geocode.fromAddress(addr)
    .then((response) => {

      const { lat, lng }: { lat: number; lng: number } = response.results[0].geometry.location;
      const locationName: string[] = [...Array.from(response.results[0].address_components)].map((v: any) => {
        return v.long_name;
      });

      const zoom = zoomLevel(response.results[0].types[0]);

      return { lat, lng, locationName, zoom };
    })
    .catch((err) => {
      // console.log(err);
      return null;
    });
};

const zoomLevel = (type: string) => {

  let result;

  if (type === 'country') {
    result = 6;
  }
  else if (type === 'administrative_area_level_1') {
    result = 10;
  }
  else {
    result = 12;
  }
  return result;
}

export default Address;
