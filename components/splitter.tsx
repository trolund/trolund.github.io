import { FunctionComponent } from 'react';

interface SplitterProps {}

const Splitter: FunctionComponent<SplitterProps> = () => {
  return <div className="bg-color mb-4 h-[5px] rounded-[8px] bg-[var(--bg-img)] bg-cover" />;
};

export default Splitter;
