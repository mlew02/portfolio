export const restBase = 'https://mlewebs.ca/kuromination/wp-json/wp/v2/'

// export const featuredImage = ( featuredImageObject ) => {
//   let imgWidth = featuredImageObject.media_details.sizes.full.width;
//   let imgHeight = featuredImageObject.media_details.sizes.full.height;
//   let imgURL = featuredImageObject.source_url;
//   let img = `<img src="${imgURL}" 
//       width="${imgWidth}"
//       height="${imgHeight}"
//       alt="${featuredImageObject.alt_text}"
//       srcset="${imgURL} ${imgWidth}w,
//       ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
//       ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
//       ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
//       sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
//   return {__html: img}
// }
export const featuredImage = (featuredImageObject) => {
  if (!featuredImageObject || !featuredImageObject.media_details || !featuredImageObject.media_details.sizes) {
      // Return a placeholder image or an empty string if the expected structure is not present
      return { __html: '<img src="placeholder.jpg" alt="Placeholder image">' };
  }

  let imgWidth = featuredImageObject.media_details.sizes.full.width;
  let imgHeight = featuredImageObject.media_details.sizes.full.height;
  let imgURL = featuredImageObject.source_url;
  let img = `<img src="${imgURL}" 
      width="${imgWidth}"
      height="${imgHeight}"
      alt="${featuredImageObject.alt_text}"
      srcset="${imgURL} ${imgWidth}w,
      ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
      ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
      ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
      sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
  return { __html: img };
};


export const slicerequirements = ( title, maxLength) => {

  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
}