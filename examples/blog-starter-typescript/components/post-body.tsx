import markdownStyles from './markdown-styles.module.css';
import Paywall from './paywall';

type Props = {
  content: string;
  isLoggedIn: boolean;
  premium: boolean;
};

const PostBody = ({ content, isLoggedIn, premium }: Props) => {
  const isNotAuthorizedAndPremium = !isLoggedIn && premium;
  return (
    <div className='max-w-2xl mx-auto'>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{
          __html: isNotAuthorizedAndPremium
            ? `${content.slice(0, 250)}...`
            : content,
        }}
        style={{ opacity: isNotAuthorizedAndPremium ? 0.2 : 1 }}
      />
      {isNotAuthorizedAndPremium && <Paywall />}
    </div>
  );
};

export default PostBody;
