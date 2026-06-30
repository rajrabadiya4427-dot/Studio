import React, { lazy, Suspense } from 'react'
import Hero from '../components/manga/Hero'
import MangaText from '../components/manga/MangaText'
import MangaPublishSteps from '../components/manga/MangaPublishSteps'

const AllManga = lazy(() => import('../components/manga/AllManga'));

const Manga = () => {
  return (
    <div id='manga'>
      <Hero />
      <MangaText />
      <MangaPublishSteps />
      <Suspense fallback={<div className="products-loading">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="product-skeleton" />)}</div>}>
        <AllManga />
      </Suspense>
    </div>
  )
}

export default Manga