import React, { lazy, Suspense } from 'react'
import Hero from '../components/story/Hero'
import StoryText from '../components/story/StoryText'
import StoryPublishSteps from '../components/story/StoryPublishSteps'

const AllStory = lazy(() => import('../components/story/AllStory'));

const Story = () => {
  return (
    <div id='story'>
      <Hero />
      <StoryText />
      <StoryPublishSteps />
      <Suspense fallback={<div className="products-loading">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="product-skeleton" />)}</div>}>
        <AllStory />
      </Suspense>
    </div>
  )
}

export default Story