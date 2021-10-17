// DEPENDENCIES
import { useState } from 'react';

// STYLED COMPONENTS
import { Content, TabContent } from './styles/SinglePlayground';

// COMPONENTS
import Amenities from './components/Amenities';
import Comments from './components/Comments';
import Info from './components/Info';
import Header from './components/Header';
import Preview from './components/Preview';
import Tabs from 'components/Tabs';

// HOOKS
import { usePlayground } from 'hooks/usePlayground';

const SinglePlayground = (): JSX.Element => {
  const tabOptions = [
    { label: 'Images', name: 'images' },
    { label: 'Features', name: 'features' },
    { label: 'Reviews', name: 'reviews' },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabOptions[0].name);

  const { isLoading, error, playground } = usePlayground();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // TODO: Add Ratings to Playground
  // TODO: Add Multiple Images

  return (
    <Content>
      <Header name={playground?.title} />
      <Info description={playground?.description} location={playground?.location} />
      <Tabs active={activeTab} handleClick={setActiveTab} options={tabOptions} />
      <TabContent>
        {activeTab === 'images' && <Preview name={playground?.title} />}
        {activeTab === 'features' && <Amenities />}
        {activeTab === 'reviews' && <Comments reviews={playground?.reviews} />}
      </TabContent>
    </Content>
  );
};

export default SinglePlayground;
