import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vienna admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
