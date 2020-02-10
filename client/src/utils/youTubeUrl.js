export function youTubeURL(youtubeUrl) {
  youtubeUrl && youtubeUrl.includes('https://www.youtube' || 'https://youtu.be')
    ? (youtubeUrl = youtubeUrl
        .replace(/youtu\.be/gi, 'www.youtube.com')
        .replace(/watch\?v=/gi, 'embed/')
        .replace(/&feature=www\.youtube\.com/gi, ''))
    : (youtubeUrl = null)
  return youtubeUrl
}
