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
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('marketplace')}
          src={require('../../../../img/post_buttons/PNG_SMALL/SALE_OFF.png')}
          alt="marketplace"
          title="marketplace"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'mixes' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('mixes')}
          src={require('../../../../img/post_buttons/PNG_SMALL/MIXES_ON_WR.png')}
          alt="mixes"
          title="mixes"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('mixes')}
          src={require('../../../../img/post_buttons/PNG_SMALL/MIXES_OFF_WR.png')}
          alt="mixes"
          title="mixes"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'video' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('video')}
          src={require('../../../../img/post_buttons/PNG_SMALL/PLAY_ON_WR.png')}
          alt="video"
          title="video"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('video')}
          src={require('../../../../img/post_buttons/PNG_SMALL/PLAY_OFF_WR.png')}
          alt="video"
          title="video"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'downloads' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('downloads')}
          src={require('../../../../img/post_buttons/PNG_SMALL/DOWNLOAD_ON_WR.png')}
          alt="downloads"
          title="downloads"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('downloads')}
          src={require('../../../../img/post_buttons/PNG_SMALL/DOWNLOAD_OFF_WR.png')}
          alt="downloads"
          title="downloads"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'news' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('news')}
          src={require('../../../../img/post_buttons/PNG_SMALL/ANOUCEMENTS_ON_WR.png')}
          alt="news"
          title="news"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('news')}
          src={require('../../../../img/post_buttons/PNG_SMALL/ANOUCEMENTS_OFF.png')}
          alt="news"
          title="news"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'gigswap' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('gigswap')}
          src={require('../../../../img/post_buttons/PNG_SMALL/GIG_SWAP_ON_WR.png')}
          alt="gigswap"
          title="gigswap"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('gigswap')}
          src={require('../../../../img/post_buttons/PNG_SMALL/GIG_SWAP_OFF_WR.png')}
          alt="gigswap"
          title="gigswap"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'help' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('help')}
          src={require('../../../../img/post_buttons/PNG_SMALL/HELP_ON_WR.png')}
          alt="help"
          title="help"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('help')}
          src={require('../../../../img/post_buttons/PNG_SMALL/HELP_OFF_WR.png')}
          alt="help"
          title="help"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'recommendations' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('recommendations')}
          src={require('../../../../img/post_buttons/PNG_SMALL/RECOMENDATIONS_ON.png')}
          alt="recommendations"
          title="recommendations"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('recommendations')}
          src={require('../../../../img/post_buttons/PNG_SMALL/RECOMENDATIONS_OFF_WR.png')}
          alt="recommendations"
          title="recommendations"
          className="reps-btn-imgs"
        />
      )}
      {hashtag === 'conversation' && showHashtags ? (
        <img
          onClick={() => showPostByHashtag('conversation')}
          src={require('../../../../img/post_buttons/PNG_SMALL/CONVERATION_ON_WR.png')}
          alt="conversation"
          title="conversation"
          className="reps-btn-imgs"
        />
      ) : (
        <img
          onClick={() => showPostByHashtag('conversation')}
          src={require('../../../../img/post_buttons/PNG_SMALL/CONVERATION_OFF_WR.png')}
          alt="conversation"
          title="conversation"
          className="reps-btn-imgs"
        />
      )}
    </div>
  )
}
