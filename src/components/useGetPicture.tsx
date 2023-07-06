import {Platform} from 'react-native';
import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';

const RESIZED_IMAGE_WIDTH = 400;
const RESIZED_IMAGE_HEIGHT = 400;

const useGetPicture = () => {
  const getImage = async (isCamera?: boolean) => {
    const imagePickerOptions: Options = {
      width: RESIZED_IMAGE_WIDTH,
      height: RESIZED_IMAGE_HEIGHT,
      mediaType: 'photo',
      maxFiles: 1,
      // forceJpg: true,
      includeBase64: true,
      cropperToolbarTitle: 'Отредактируйте ваше фото',
    };

    try {
      const {openCamera, openPicker} = ImagePicker;

      let image;
      if (Platform.OS === 'android') {
        const pickedImage = isCamera
          ? await openCamera({...imagePickerOptions})
          : await openPicker({...imagePickerOptions});

        image = await ImagePicker.openCropper({
          ...imagePickerOptions,
          path: pickedImage.path,
          includeBase64: true,
        });
      } else {
        const imageOptions = {
          ...imagePickerOptions,
          cropping: true,
          maxFiles: 1,
          includeBase64: true,
        };

        const setDelay = (onOpenImagePicker: () => any) => {
          let promise = new Promise<Image>(resolve => {
            setTimeout(async () => {
              try {
                image = await onOpenImagePicker();
                resolve(image);
              } catch (e) {}
            }, 10);
          });
          return promise;
        };
        image = isCamera
          ? await setDelay(() => openCamera(imageOptions))
          : await setDelay(() => openPicker(imageOptions));
      }

      const splitedFilename = image.path.split('/');
      const filename = splitedFilename[splitedFilename.length - 1];
      if (filename && image) {
        const photo = {
          source: {uri: `data:${image.mime};base64,${image.data}`},
          data: image,
          filename,
        };
        return photo;
      }
      return null;
    } catch {}
  };

  return {getImage};
};

export default useGetPicture;
