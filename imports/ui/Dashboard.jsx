import React from 'react';

import PrivateHeader from './PrivateHeader';
import ShoppingLists from './ShoppingLists';
import Editor from './Editor';

export default () => {
  return (
    <div>
      <PrivateHeader title="RealTime Shopping Lists" />
      <div className="page-content">
        <div className="page-content__sidebar">
          <ShoppingLists />
        </div>
        <div className="page-content__main">
          <Editor />
        </div>
      </div>
    </div>
  );
};
