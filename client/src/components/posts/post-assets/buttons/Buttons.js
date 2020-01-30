import React from 'react'

export default function Buttons({ showPostByHashtag, hashtag, showHashtags }) {
  return (
    <div className="postfeed_reps_btns">
      {hashtag === 'marketplace' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('marketplace')}
          src={require('../../../../img/post_buttons/PNG_SMALL/sale_ON.png')}
          alt="marketplace"
          title="marketplace"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('marketplace')}
          src={require('../../../../img/post_buttons/PNG_SMALL/SALE_OFF.png')}
          alt="marketplace"
          title="marketplace"
        />
      )}
      {hashtag === 'mixes' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('mixes')}
          src={require('../../../../img/post_buttons/PNG_SMALL/MIXES_ON_WR.png')}
          alt="mixes"
          title="mixes"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('mixes')}
          src={require('../../../../img/post_buttons/PNG_SMALL/MIXES_OFF_WR.png')}
          alt="mixes"
          title="mixes"
        />
      )}
      {hashtag === 'video' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('video')}
          src={require('../../../../img/post_buttons/PNG_SMALL/PLAY_ON_WR.png')}
          alt="video"
          title="video"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('video')}
          src={require('../../../../img/post_buttons/PNG_SMALL/PLAY_OFF_WR.png')}
          alt="video"
          title="video"
        />
      )}
      {hashtag === 'downloads' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('downloads')}
          src={require('../../../../img/post_buttons/PNG_SMALL/DOWNLOAD_ON_WR.png')}
          alt="downloads"
          title="downloads"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('downloads')}
          src={require('../../../../img/post_buttons/PNG_SMALL/DOWNLOAD_OFF_WR.png')}
          alt="downloads"
          title="downloads"
        />
      )}
      {hashtag === 'news' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('news')}
          src={require('../../../../img/post_buttons/PNG_SMALL/ANOUCEMENTS_ON_WR.png')}
          alt="news"
          title="news"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('news')}
          src={require('../../../../img/post_buttons/PNG_SMALL/ANOUCEMENTS_OFF.png')}
          alt="news"
          title="news"
        />
      )}
      {hashtag === 'gigswap' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('gigswap')}
          src={require('../../../../img/post_buttons/PNG_SMALL/GIG_SWAP_ON_WR.png')}
          alt="gigswap"
          title="gigswap"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('gigswap')}
          src={require('../../../../img/post_buttons/PNG_SMALL/GIG_SWAP_OFF_WR.png')}
          alt="gigswap"
          title="gigswap"
        />
      )}
      {hashtag === 'help' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('help')}
          src={require('../../../../img/post_buttons/PNG_SMALL/HELP_ON_WR.png')}
          alt="help"
          title="help"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('help')}
          src={require('../../../../img/post_buttons/PNG_SMALL/HELP_OFF_WR.png')}
          alt="help"
          title="help"
        />
      )}
      {hashtag === 'recommendations' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('recommendations')}
          src={require('../../../../img/post_buttons/PNG_SMALL/RECOMENDATIONS_ON.png')}
          alt="recommendations"
          title="recommendations"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('recommendations')}
          src={require('../../../../img/post_buttons/PNG_SMALL/RECOMENDATIONS_OFF_WR.png')}
          alt="recommendations"
          title="recommendations"
        />
      )}
      {hashtag === 'conversation' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('conversation')}
          src={require('../../../../img/post_buttons/PNG_SMALL/CONVERATION_ON_WR.png')}
          alt="conversation"
          title="conversation"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('conversation')}
          src={require('../../../../img/post_buttons/PNG_SMALL/CONVERATION_OFF_WR.png')}
          alt="conversation"
          title="conversation"
        />
      )}
    </div>
  )
}
