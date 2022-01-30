import React, { useEffect } from 'react';
import {MarkAsRead, AddToFavorite, RemoveFromFavorite} from './Action';
import {useDispatch} from 'react-redux';

function EmailBody({ emailDetails, time }) {
  const dispatch = useDispatch();

  useEffect(()=>{
    if (emailDetails.read) {
        return;
    }
    dispatch(MarkAsRead(emailDetails.id))
  },[emailDetails])

    return (
        <section className="email_body">
            <div className="body_profile_pic">
                {emailDetails.from.name.charAt(0).toUpperCase()}
            </div>
            <div className="body_content">
                <div className="body_content_header">
                    <h2>{emailDetails.subject}</h2>
                    <button onClick={()=>dispatch(AddToFavorite(emailDetails.id))}>Mark as favorites</button>
                    <time>{time}</time>
                </div>
                <div dangerouslySetInnerHTML={{ __html: emailDetails.body }} />
            </div>
        </section>
    )
}

export default EmailBody
