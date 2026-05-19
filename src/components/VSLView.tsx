import React, { useState, useEffect } from 'react';
import { ThumbsUp, Send } from 'lucide-react';

interface Reply {
  id: number;
  name: string;
  pic: string;
  text: string;
  likes: number;
  time: string;
  userHasLiked: boolean;
}

interface CommentData {
  id: number;
  name: string;
  pic: string;
  text: string;
  likes: number;
  time: string;
  userHasLiked: boolean;
  replies: Reply[];
}

const initialComments: CommentData[] = [
  {
    id: 1,
    name: 'Thabo Mokoena',
    pic: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&q=80',
    text: 'I honestly thought this was another online scam, but my Capitec account just got credited with R15,000. It took about 5 minutes after watching the entire video! Thank you so much 🙏🏾',
    likes: 124,
    time: '2 mins',
    userHasLiked: false,
    replies: [
      {
        id: 101,
        name: 'Lerato Kgositsile',
        pic: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&q=80',
        text: 'Did they ask for any upfront fees? I am watching the video now.',
        likes: 12,
        time: '1 min',
        userHasLiked: false,
      },
      {
        id: 102,
        name: 'Thabo Mokoena',
        pic: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop&q=80',
        text: 'No upfront fees at all. Just watch the video to the end, it explains everything.',
        likes: 28,
        time: 'Just now',
        userHasLiked: false,
      }
    ]
  },
  {
    id: 2,
    name: 'Johan Van Der Merwe',
    pic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80',
    text: 'Standard bank just cleared my funds. Easiest money I have ever made. Make sure you don\'t skip the video guys.',
    likes: 89,
    time: '15 mins',
    userHasLiked: false,
    replies: []
  },
  {
    id: 3,
    name: 'Sipho Ndlovu',
    pic: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop&q=80',
    text: 'Thank God I didn\'t close the page. The video explained exactly how the withdrawal is processed. Money is already in my FNB app!',
    likes: 45,
    time: '1 hr',
    userHasLiked: false,
    replies: []
  },
  {
    id: 4,
    name: 'Nomsa Dlamini',
    pic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80',
    text: 'Can I do this again tomorrow? I really need to pay my rent and school fees for the kids.',
    likes: 21,
    time: '2 hrs',
    userHasLiked: false,
    replies: []
  }
];

const VSLView: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  // Current user mock profile
  const currentUser = {
    name: 'You',
    pic: 'https://ui-avatars.com/api/?name=You&background=random'
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/b254c3e1-6389-4752-8a0b-73f0d48f9c18/players/6a0c0bb2f3e6800520594755/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleLikeComment = (commentId: number) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.userHasLiked ? c.likes - 1 : c.likes + 1,
          userHasLiked: !c.userHasLiked
        };
      }
      return c;
    }));
  };

  const handleLikeReply = (commentId: number, replyId: number) => {
    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: c.replies.map(r => {
            if (r.id === replyId) {
              return {
                ...r,
                likes: r.userHasLiked ? r.likes - 1 : r.likes + 1,
                userHasLiked: !r.userHasLiked
              };
            }
            return r;
          })
        };
      }
      return c;
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: CommentData = {
      id: Date.now(),
      name: currentUser.name,
      pic: currentUser.pic,
      text: newComment,
      likes: 0,
      time: 'Just now',
      userHasLiked: false,
      replies: []
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const handleAddReply = (e: React.FormEvent, commentId: number) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReplyObj: Reply = {
      id: Date.now(),
      name: currentUser.name,
      pic: currentUser.pic,
      text: replyText,
      likes: 0,
      time: 'Just now',
      userHasLiked: false
    };

    setComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, newReplyObj]
        };
      }
      return c;
    }));
    
    setReplyText('');
    setReplyingTo(null);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px', backgroundColor: '#fff', minHeight: '100vh', margin: '-24px', padding: '24px' }}>
      
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div style={{ 
          display: 'inline-block', 
          backgroundColor: '#fee2e2', 
          color: '#ef4444', 
          padding: '4px 12px', 
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '12px',
          marginBottom: '16px'
        }}>
          ATTENTION: WITHDRAWAL PENDING
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '900', lineHeight: '1.2', color: '#111827' }}>
          Watch this short video to complete your <span style={{ color: 'var(--primary)' }}>R15,000</span> withdrawal!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '12px', marginBottom: '24px' }}>
          Due to high demand, you must watch the video below to the end to release your funds.
        </p>
      </div>

      {/* Vturb Player Container */}
      <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        {/* @ts-ignore - custom web component */}
        <vturb-smartplayer id="vid-6a0c0bb2f3e6800520594755" style={{ display: 'block', margin: '0 auto', width: '100%' }}></vturb-smartplayer>
      </div>

      {/* Facebook Style Comments Section */}
      <div style={{ marginTop: '24px', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '15px', color: '#65676B', fontWeight: '600' }}>
          <span>{comments.reduce((acc, c) => acc + 1 + c.replies.length, 0)} comments</span>
          <span>Sort by: Top</span>
        </div>

        {/* Add Main Comment */}
        <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <img 
            src={currentUser.pic} 
            alt="You" 
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Write a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 40px 10px 16px',
                borderRadius: '20px',
                border: '1px solid #ccd0d5',
                backgroundColor: '#f0f2f5',
                fontSize: '15px',
                outline: 'none'
              }}
            />
            <button 
              type="submit" 
              disabled={!newComment.trim()}
              style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: newComment.trim() ? 'pointer' : 'default',
                color: newComment.trim() ? '#1877F2' : '#bcc0c4',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ display: 'flex', gap: '8px' }}>
              <img 
                src={comment.pic} 
                alt={comment.name} 
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ backgroundColor: '#f0f2f5', borderRadius: '18px', padding: '8px 12px', display: 'inline-block', position: 'relative' }}>
                  <div style={{ fontWeight: '600', color: '#050505', fontSize: '13px', marginBottom: '2px' }}>
                    {comment.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#050505', lineHeight: '1.4' }}>
                    {comment.text}
                  </div>
                  {/* Like Counter Badge */}
                  {comment.likes > 0 && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '-8px', 
                      right: '-16px', 
                      backgroundColor: '#fff', 
                      borderRadius: '10px', 
                      padding: '2px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      fontSize: '11px',
                      color: '#65676B'
                    }}>
                      <div style={{ backgroundColor: '#1877F2', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ThumbsUp size={8} color="white" fill="white" />
                      </div>
                      {comment.likes}
                    </div>
                  )}
                </div>
                
                {/* FB Action Links */}
                <div style={{ display: 'flex', gap: '12px', marginLeft: '12px', marginTop: '4px', fontSize: '12px', color: '#65676B', fontWeight: '600' }}>
                  <span 
                    onClick={() => handleLikeComment(comment.id)} 
                    style={{ cursor: 'pointer', color: comment.userHasLiked ? '#1877F2' : '#65676B' }}
                  >
                    Like
                  </span>
                  <span 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} 
                    style={{ cursor: 'pointer' }}
                  >
                    Reply
                  </span>
                  <span style={{ fontWeight: 'normal' }}>{comment.time}</span>
                </div>

                {/* Reply Input Box */}
                {replyingTo === comment.id && (
                  <form onSubmit={(e) => handleAddReply(e, comment.id)} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <img 
                      src={currentUser.pic} 
                      alt="You" 
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, position: 'relative' }}>
                      <input 
                        type="text" 
                        autoFocus
                        placeholder={`Reply to ${comment.name}...`} 
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px 32px 6px 12px',
                          borderRadius: '16px',
                          border: '1px solid #ccd0d5',
                          backgroundColor: '#f0f2f5',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                      <button 
                        type="submit" 
                        disabled={!replyText.trim()}
                        style={{ 
                          position: 'absolute', 
                          right: '8px', 
                          top: '50%', 
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          cursor: replyText.trim() ? 'pointer' : 'default',
                          color: replyText.trim() ? '#1877F2' : '#bcc0c4',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {comment.replies.map(reply => (
                      <div key={reply.id} style={{ display: 'flex', gap: '8px' }}>
                        <img 
                          src={reply.pic} 
                          alt={reply.name} 
                          style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ backgroundColor: '#f0f2f5', borderRadius: '18px', padding: '6px 10px', display: 'inline-block', position: 'relative' }}>
                            <div style={{ fontWeight: '600', color: '#050505', fontSize: '13px', marginBottom: '2px' }}>
                              {reply.name}
                            </div>
                            <div style={{ fontSize: '13px', color: '#050505', lineHeight: '1.4' }}>
                              {reply.text}
                            </div>
                            {reply.likes > 0 && (
                              <div style={{ 
                                position: 'absolute', 
                                bottom: '-8px', 
                                right: '-12px', 
                                backgroundColor: '#fff', 
                                borderRadius: '10px', 
                                padding: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                fontSize: '11px',
                                color: '#65676B'
                              }}>
                                <div style={{ backgroundColor: '#1877F2', borderRadius: '50%', width: '12px', height: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <ThumbsUp size={7} color="white" fill="white" />
                                </div>
                                {reply.likes}
                              </div>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '12px', marginLeft: '12px', marginTop: '4px', fontSize: '11px', color: '#65676B', fontWeight: '600' }}>
                            <span 
                              onClick={() => handleLikeReply(comment.id, reply.id)} 
                              style={{ cursor: 'pointer', color: reply.userHasLiked ? '#1877F2' : '#65676B' }}
                            >
                              Like
                            </span>
                            <span 
                              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} 
                              style={{ cursor: 'pointer' }}
                            >
                              Reply
                            </span>
                            <span style={{ fontWeight: 'normal' }}>{reply.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default VSLView;
