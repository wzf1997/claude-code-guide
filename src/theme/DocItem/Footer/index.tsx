import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type { WrapperProps } from '@docusaurus/types';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): React.ReactElement {
  const { colorMode } = useColorMode();

  return (
    <>
      <Footer {...props} />
      <div style={{ marginTop: '2rem' }}>
        <Giscus
          id="comments"
          repo="your-github-username/claude-code-guide"
          repoId="YOUR_REPO_ID"
          category="Announcements"
          categoryId="YOUR_CATEGORY_ID"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={colorMode === 'dark' ? 'dark' : 'light'}
          lang="zh-CN"
          loading="lazy"
        />
      </div>
    </>
  );
}
