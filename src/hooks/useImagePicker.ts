import React from 'react'
import * as ImagePicker from 'expo-image-picker'

interface IParsedImage {
  uri: string
  name: string
  type: string
}

const useImagePicker = () => {
  const [imageUri, setImageUri] = React.useState<string | null>(null)
  const [parsedImage, setParsedImage] = React.useState<IParsedImage | null>(null)

  React.useEffect(() => {
    if (typeof imageUri === 'string') {
      const fileName = imageUri.split('/').pop()

      if (fileName === undefined) {
        setParsedImage(null)
        return
      }

      const fileType = fileName.split('.').pop()

      setParsedImage({
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`
      })
    }
  }, [imageUri])

  const pickImage = async () => {
    const imagePickerParams: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    }

    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync(imagePickerParams)
      if (pickerResult.canceled) throw new Error()
      setImageUri(pickerResult.assets[0].uri)
    } catch (e) {
      setImageUri(null)
    }
  }

  return {
    uri: imageUri,
    parsedImage,
    pickImage
  }
}

export default useImagePicker
