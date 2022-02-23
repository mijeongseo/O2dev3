import React, { useCallback, useEffect, useState } from 'react';
import { LAYOUT_PROPS } from 'props';
import { MapboxDiv } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import DeckGL from 'deck.gl';
import { MapRef, StaticMap } from 'react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import Layer from '@deck.gl/core/lib/layer';
import InternalImageLayer from 'utils/InternalImageLayer';
import ExternalImageLayer from 'utils/ExternalImageLayer';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SET_VIEWPORT } from 'store/modules/mapbox';

import FileSaver from 'file-saver';

type ViewportProps = {
  preview: string;
  sidebarSelect: string;
};

// boundary : mapbox 현재 보여지는 부분 lng, lat : 선택된 영역에 대한 viewport
const chkImageInViewport = (boundary: { [key: string]: number }[], lng: number, lat: number) => {
  let lngFlag = false;
  let latFlag = false;

  if (boundary[0].lat < boundary[1].lat) {
    boundary[0].lat < lat && boundary[1].lat > lat ? (latFlag = true) : (latFlag = false);
  } else {
    boundary[0].lat > lat && boundary[1].lat < lat ? (latFlag = true) : (latFlag = false);
  }

  if (boundary[0].lng < boundary[1].lng) {
    boundary[0].lng < lng && boundary[1].lng > lng ? (lngFlag = true) : (lngFlag = false);
  } else {
    boundary[0].lng > lng && boundary[1].lng < lng ? (lngFlag = true) : (lngFlag = false);
  }

  return lngFlag && latFlag;
};

const layerIDGenerator = (layer: string, id?: number, service?: string, name?: string, internal?: boolean) => {
  if (layer === 'finder') {
    if (internal) {
      return `internalImageLayer_${id?.toString()}_${service}`;
    } else {
      return `externalImageLayer_${name}`;
    }
  } else if (layer === 'mypage') {
    return `myPageImageLayer_${id?.toString()}_${service}`;
  }
};

const BEFORE_LAYER_ID = 'road-simple';
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
const MAPBOX_STYLE = {
  dark: process.env.NEXT_PUBLIC_MAPBOX_DARK_MODE || '',
  light: process.env.NEXT_PUBLIC_MAPBOX_LIGHT_MODE || '',
};

function Viewport({ preview, sidebarSelect }: ViewportProps) {
  const viewport = useSelector((state: RootState) => state.mapbox.viewport);
  const mapStyle = useSelector((state: RootState) => state.mapbox.mapStyle);

  const imageList = useSelector((state: RootState) => state.searchResult.imageList.data?.images);
  const selectImage = useSelector((state: RootState) => state.searchResult.imageList.data?.selectImage);

  const myImageList = useSelector((state: RootState) => state.myimage.imageList);
  const selectMyImage = useSelector((state: RootState) => state.myimage.selectMyImage);
  const myImagesLocationList = useSelector((state: RootState) => state.myimage.locationJsonList);

  const myImageOpacity = useSelector((state: RootState) => state.myimage.imageOpacity);

  const dispatch = useDispatch();
  const onSetViewport = useCallback((latitude, longitude, zoom) => dispatch({ type: SET_VIEWPORT, latitude, longitude, zoom }), [dispatch]);

  const [viewportState, setViewportState] = useState(viewport);

  const [layer, setLayer] = useState<Layer<any>[]>([]);
  const [myPageLayer, setMyPageLayer] = useState<Layer<any>[]>([]);
  // const [myPageHoverlayer, setMyPageHoverLayer] = useState<Layer<any>[]>([]);

  const [overlayLayer, setOverlayLayer] = useState<Layer<any>[] | undefined>();

  const [glContext, setGLContext] = useState<WebGLRenderingContext>();
  const deckRef = React.useRef<DeckGL>(null);
  const mapRef = React.useRef<MapRef>(null);

  const onMapboxLoaded = useCallback(() => {
    const map = mapRef.current?.getMap();
    const deck = deckRef.current?.deck;

    map.addLayer(new MapboxLayer({ id: 'dummy_layer', deck }));
  }, []);

  const onCaptureCanvas = useCallback(() => {
    if (document) {
      const canvas: any = document.getElementById('deckgl-overlay');
      canvas.toBlob((blob) => {
        FileSaver.saveAs(blob);
      });
    }
  }, []);

  const onHandleViewportChange = useCallback((viewState) => {
    // console.log(viewState.viewState.zoom)
    setViewportState(viewState.viewState);
  }, []);
  
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    const map = mapRef.current?.getMap();
    const deck = deckRef.current?.deck;

    setTimeout(() => {
      // console.log(map.getStyle())
      // console.log(overlayLayer)
      overlayLayer?.map((layer) => {
        map.addLayer(new MapboxLayer({ id: layer.id, deck }), BEFORE_LAYER_ID);
      })
    }, 500)
  }, [mapStyle]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const activatedImages = imageList?.filter((image) => image.select);
    const activatedMyImages = myImageList?.filter((image) => image.select);

    if (sidebarSelect === 'FINDER' && activatedImages?.length === 0) {
      setLayer(
        layer.map((layer) => {
          return layer.clone({ visible: false });
        }),
      );
    }
    console.log(activatedMyImages);
    if (sidebarSelect === 'MY PAGE' && activatedMyImages?.length === 0) {
      setMyPageLayer(
        myPageLayer.map((layer) => {
          return layer.clone({ visible: false });
        }),
      );
    }

    // const map = mapRef.current?.getMap();
    // console.log(imageList)
    // console.log(layer)
    // console.log(map.getStyle().layers)

    // if (!imageList) {
    //   // setMyPageLayer([]);
    //   // setOverlayLayer([]);
    //   // setLayer([]);
    //   console.log('asdfasdfasdfasdf')
    // }

    // console.log(overlayLayer)
    // console.log(myPageLayer)

    // layer.map(layer => {
    //   return layer.id.includes('externalImageLayer_') ? map.removeLayer(layer.id) : layer
    // })
  }, [imageList, myImageList]);

  useEffect(() => {
    // console.log(mapStyle)
  }, [mapStyle]);

  useEffect(() => {
    const finderList = imageList?.filter((image) => image.select);
    const mypageList = myImageList?.filter((image) => image.select);

    if (sidebarSelect === 'FINDER') {
      setLayer(
        layer.map((layer) => {
          if (layer.id.includes('internalImageLayer')) {
            return finderList?.find((image) => layer.id.includes(`internalImageLayer_${image.idx.toString()}_`))
              ? layer.clone({ visible: true })
              : layer;
          } else {
            return finderList?.find((image) => layer.id === `externalImageLayer_${image.name}`) ? layer.clone({ visible: true }) : layer;
          }
        }),
      );
      setMyPageLayer(
        myPageLayer.map((layer) => {
          return layer.clone({ visible: false });
        }),
      );
      // setMyPageHoverLayer(myPageHoverlayer.map(layer => {
      //   return layer.clone({visible: false});
      // }));
    } else if (sidebarSelect === 'MY PAGE') {
      setMyPageLayer(
        myPageLayer.map((layer) => {
          return mypageList?.find(
            (image) =>
              layer.id.includes(`myPageImageLayer_${image.image_idx.toString()}_`) &&
              image.select_service.includes(layer.id.split('_').at(-1)!),
          )
            ? layer.clone({ visible: true })
            : layer;
        }),
      );
      // setMyPageHoverLayer(myPageHoverlayer.map(layer => {
      //   return layer.clone({visible: true});
      // }));
      setLayer(
        layer.map((layer) => {
          return layer.clone({ visible: false });
        }),
      );
    }
  }, [sidebarSelect]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const boundary: { [key: string]: number }[] = Object.values(mapRef.current?.getMap().getBounds());

    if (!chkImageInViewport(boundary, viewport.longitude!, viewport.latitude!)) {
      setViewportState(viewport);
    }
  }, [viewport]);

  // useEffect(() => {
  //   if (!myImagesLocationList) {
  //     return;
  //   }
  //   // setMyPageHoverLayer([BoundaryLayer({ data: myImagesLocationList, layer: 'myPage' })])
  // }, [myImagesLocationList])

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (myPageLayer.find((layer) => layer.id === `myPageImageLayer_${myImageOpacity![0].toString()}_${myImageOpacity![1]}`)) {
      setMyPageLayer(
        myPageLayer.map((layer) => {
          // const bounds = myImageList?.find(image => image.image_idx === myImageOpacity![0])?.image_info.bounds!;
          // const newBounds: [number, number, number, number] = [bounds[0], bounds[1], bounds[0] + (- bounds[0] + bounds[2]) *  myImageOpacity![2], bounds[1] + (- bounds[1] + bounds[3]) *  myImageOpacity![2]]
          // return layer.id === `myPageImageLayer_${myImageOpacity![0].toString()}_${myImageOpacity![1]}` ? layer.clone({ extent: newBounds }) : layer;
          return layer.id === `myPageImageLayer_${myImageOpacity![0].toString()}_${myImageOpacity![1]}`
            ? layer.clone({ opacity: myImageOpacity![2] })
            : layer;
        }),
      );
    }
  }, [myImageOpacity]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!selectMyImage) {
      setMyPageLayer([]);
      return;
    }

    const info = myImageList?.find((image) => image.image_idx === selectMyImage[0]);
    const map = mapRef.current?.getMap();
    const deck = deckRef.current?.deck;

    // console.log(map.getStyle().layers)
    // console.log(deck?.props.layers)

    const existLayer = myPageLayer.find((layer) => layer.id === `myPageImageLayer_${info?.image_idx.toString()}_${selectMyImage[1]}`);

    // 새로 생성
    if (!existLayer) {
      if (selectMyImage[1] === 'sr') {
        const getLayerLoad = async () => {
          let tileLayer: Layer<any>;

          tileLayer = await InternalImageLayer({
            id: selectMyImage[0],
            service: selectMyImage[1],
            bounds: info?.sr_info?.bounds!,
            url: info?.sr_info?.tiles![0]! + info?.sr_info?.tiles![1]!,
            opacity: 1,
            layer: 'mypage',
          });

          return [tileLayer];
        };

        getLayerLoad()
          .then((value) => {
            onSetViewport(info?.image_info.center![1], info?.image_info.center![0], info?.image_info.center![2]);
            map.addLayer(new MapboxLayer({ id: value[0].id, deck }), BEFORE_LAYER_ID);
            setMyPageLayer(myPageLayer.concat(value));
          })
          .catch((error) => console.log(error));
      } else {
        const getLayerLoad = async () => {
          let tileLayer: Layer<any>;

          tileLayer = await InternalImageLayer({
            id: selectMyImage[0],
            service: selectMyImage[1],
            bounds: info?.image_info.bounds!,
            url: info?.image_info.tiles![0]! + info?.image_info.tiles![info.image_info.services.indexOf(selectMyImage[1]) + 1]!,
            opacity: 1,
            layer: 'mypage',
          });

          return [tileLayer];
        };

        getLayerLoad()
          .then((value) => {
            onSetViewport(info?.image_info.center![1], info?.image_info.center![0], info?.image_info.center![2]);
            map.addLayer(new MapboxLayer({ id: value[0].id, deck }), BEFORE_LAYER_ID);
            setMyPageLayer(myPageLayer.concat(value));
          })
          .catch((error) => console.log(error));
      }
    } else {
      if (!selectMyImage[2]) {
        setMyPageLayer(
          myPageLayer.map((layer) => {
            return layer.id === `myPageImageLayer_${info?.image_idx.toString()}_${selectMyImage[1]}`
              ? layer.clone({ visible: false })
              : layer;
          }),
        );
      } else {
        onSetViewport(info?.image_info.center![1], info?.image_info.center![0], info?.image_info.center![2]);
        map.moveLayer(`myPageImageLayer_${info?.image_idx.toString()}_${selectMyImage[1]}`, BEFORE_LAYER_ID);
        setMyPageLayer(
          myPageLayer.map((layer) => {
            return layer.id === `myPageImageLayer_${info?.image_idx.toString()}_${selectMyImage[1]}`
              ? layer.clone({ visible: true })
              : layer;
          }),
        );
      }
    }
  }, [selectMyImage]);

  useEffect(() => {
    if (!selectImage) {
      setLayer([]);
      return;
    }

    const info = imageList?.find((image) => image.idx === selectImage[1] && image.internal === selectImage[0]);
    const map = mapRef.current?.getMap();
    const deck = deckRef.current?.deck;

    const existLayer = (selectImage[0] && info?.done)
      ? layer.find((layer) => layer.id === `internalImageLayer_${info?.idx.toString()}_${selectImage[2]}`)
      : layer.find((layer) => layer.id === `externalImageLayer_${info?.name}`);

    // 가지고 있는 영상 (internal)
    if (selectImage[0] && info?.done) {
      // 새로 생성
      if (!existLayer) {
        const getLayerLoad = async () => {
          let tileLayer: Layer<any>;

          tileLayer = await InternalImageLayer({
            id: selectImage[1],
            service: selectImage[2],
            bounds: info?.bounds!,
            url: info?.tiles![0]! + info?.tiles![info.services.indexOf(selectImage[2]) + 1]!,
            opacity: 1,
            layer: 'finder',
          });

          return [tileLayer];
        };

        getLayerLoad()
          .then((value) => {
            onSetViewport(info?.center![1], info?.center![0], info?.center![2]);
            map.addLayer(new MapboxLayer({ id: value[0].id, deck }), BEFORE_LAYER_ID);
            setLayer(
              layer
                .map((layer) => {
                  return layer.id.includes(`internalImageLayer_${info?.idx.toString()}_`) ? layer.clone({ visible: false }) : layer;
                })
                .concat(value),
            );
          })
          .catch((error) => console.log(error));
      } else {
        if (!selectImage[3]) {
          setLayer(
            layer.map((layer) => {
              return layer.id === `internalImageLayer_${info?.idx.toString()}_${selectImage[2]}` ? layer.clone({ visible: false }) : layer;
            }),
          );
        } else {
          onSetViewport(info?.center![1], info?.center![0], info?.center![2]);
          map.moveLayer(`internalImageLayer_${info?.idx.toString()}_${selectImage[2]}`, BEFORE_LAYER_ID);
          setLayer(
            layer.map((layer) => {
              return layer.id.includes(`internalImageLayer_${info?.idx.toString()}_`)
                ? layer.id === `internalImageLayer_${info?.idx.toString()}_${selectImage[2]}`
                  ? layer.clone({ visible: true })
                  : layer.clone({ visible: false })
                : layer;
            }),
          );
        }
      }
    } else {

      console.log(info)
      // 새로 생성
      if (!existLayer) {
        const getLayerLoad = async () => {
          let tileLayer: Layer<any>;

          tileLayer = await ExternalImageLayer({
            name: info?.name!,
            bounds: info?.bounds!,
            url: info?.internal ? info?.thumbnail!['origin'] : info?.thumbnail!,
            opacity: 1,
          });

          return [tileLayer];
        };

        getLayerLoad()
          .then((value) => {
            onSetViewport((info?.bounds[1]! + info?.bounds[3]!) / 2, (info?.bounds[0]! + info?.bounds[2]!) / 2, 8);
            map.addLayer(new MapboxLayer({ id: value[0].id, deck }), BEFORE_LAYER_ID);
            setLayer(layer.concat(value));
          })
          .catch((error) => console.log(error));
      } else {
        if (!selectImage[3]) {
          setLayer(
            layer.map((layer) => {
              return layer.id === `externalImageLayer_${info?.name}` ? layer.clone({ visible: false }) : layer;
            }),
          );
        } else {
          onSetViewport((info?.bounds[1]! + info?.bounds[3]!) / 2, (info?.bounds[0]! + info?.bounds[2]!) / 2, 8);
          map.moveLayer(`externalImageLayer_${info?.name}`, BEFORE_LAYER_ID);
          setLayer(
            layer.map((layer) => {
              return layer.id === `externalImageLayer_${info?.name}` ? layer.clone({ visible: true }) : layer;
            }),
          );
        }
      }
    }
  }, [selectImage]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    setOverlayLayer(layer.concat(myPageLayer));
    // setOverlayLayer(layer.concat(myPageLayer).concat(myPageHoverlayer));
  }, [layer, myPageLayer]);
  // }, [layer, myPageLayer, myPageHoverlayer]);

  return (
    <MapboxDiv height={LAYOUT_PROPS.h_height} width={LAYOUT_PROPS.s_width}>
      <DeckGL
        ref={deckRef}
        controller
        viewState={viewportState}
        onViewStateChange={onHandleViewportChange}
        layers={overlayLayer}
        onWebGLInitialized={setGLContext}
        glOptions={{ stencil: true, preserveDrawingBuffer: true }}
      >
        {glContext && (
          <StaticMap
            reuseMaps
            ref={mapRef}
            gl={glContext}
            mapStyle={mapStyle === 'dark' ? MAPBOX_STYLE.dark : MAPBOX_STYLE.light}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            onLoad={onMapboxLoaded}
          />
        )}
      </DeckGL>
      {/* 캔버스 캡쳐 임시 버튼 */}
       {/* <button onClick={onCaptureCanvas} style={{ position: 'fixed' }}>
        버튼
      </button> */}
    </MapboxDiv>
  );
}

export default React.memo(Viewport);
