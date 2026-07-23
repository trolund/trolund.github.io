import { FunctionComponent } from 'react';

interface SplitterProps {}

const Splitter: FunctionComponent<SplitterProps> = () => {
  return <div className="bg-color bg-(--bg-img) mb-4 h-[5px] rounded-[8px] bg-cover" />;
};

export default Splitter;
