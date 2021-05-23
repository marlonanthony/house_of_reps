import React from 'react'
import { Link } from 'react-router-dom'

import SearchReps from '../../../pages/create_chatroom/SearchReps'

export default function SideDrawer({
  toggleDrawer,
  invite,
  accepted,
  setAccepted,
  acceptChatroomInvite,
  admin,
  mods,
  moderators,
  member,
  members,
  invites,
  showForm,
  inviteMore,
  setInviteMore,
  deleteChatroom,
  addMembers,
  setShowForm,
  props,
  _id,
  profile,
  leaveChatroom
}) {
  return (
    <section id={ toggleDrawer ? 'chatroom-drawer-active' : 'chatroom-drawer-inactive'}>
      {invite && !accepted && (
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setAccepted(true)
            acceptChatroomInvite(props.match.params.id)
          }}
        >
          Accept Invite
        </button>
      )}
      <ul className='chatroom-uls'>
        Admin
        <li className='chatroom-lis'>
          <Link className='chatroom-li-a' to={`/profile/${admin && admin.handle}`}>
            {admin && '@' + admin.handle}
          </Link>
          <i
            className="material-icons chatroom-li-icon"
            onClick={() => alert( "You'll be allowed to do something with " +admin.handle + ' soon')}
          >
            more_vert
          </i>
        </li>
      </ul>

      <ul className='chatroom-uls'>
        Mods
        {moderators && 
          moderators.map(person => (
            <li className='chatroom-lis' key={person._id}>
              <Link className='chatroom-li-a' to={`/profile/${person.handle}`}>
                {person && '@' + person.handle}
              </Link>
              <i
                className="material-icons chatroom-li-icon"
                onClick={() => alert( "You'll be allowed to do something with " +person.handle + ' soon')}
              >
                more_vert
              </i>
            </li>
          ))}
      </ul>
      <ul className='chatroom-uls'>
        Members
        {members && 
          members.map(member => (
            <li className='chatroom-lis' key={member._id}>
              <Link className='chatroom-li-a' to={`/profile/${member.handle}`}>
                @{member.handle}
              </Link>
              <i
                className="material-icons chatroom-li-icon"
                onClick={() => alert( "You'll be allowed to do something with " +member.handle + ' soon')}
              >
                more_vert
              </i>
            </li>
          ))}
      </ul>
      <ul className='chatroom-uls'>
        Invited
        {invites &&
          invites.map(person => (
            <li className='chatroom-lis' key={person._id}>
              <Link className='chatroom-li-a' to={`/profile/${person.handle}`}>
                @{person.handle}
              </Link>
              <i
                className="material-icons chatroom-li-icon"
                onClick={() => alert( "You'll be allowed to do something with " +person.handle + ' soon')}
              >
                more_vert
              </i>
            </li>
          ))}
      </ul>
      {(admin && admin.id) === props.auth.user.id && (
        <button onClick={() => deleteChatroom(_id, props.history)}>
          Delete Chatroom
        </button>
      )}
      {member && member.id !== admin.id && (
        <button
          onClick={() => leaveChatroom(_id, props.history)}
        >
          Leave Chatroom
        </button>
      )}
      {((admin && admin.id) === props.auth.user.id || (mods && member)) && (
        <button onClick={() => setShowForm(val => !val)}>Edit chatroom</button>
      )}
      {showForm && (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              const noDups = inviteMore.filter(
                (person, index, arr) =>
                  index === arr.findIndex(t => t.id === person.id)
              )
              addMembers(_id, noDups)
            }}
          >
            <SearchReps
              profiles={profile.profiles}
              setInvites={setInviteMore}
              placeholder="Invite Members"
            />

            {inviteMore && (
              <ul>
                {inviteMore.map(m => (
                  <li
                    key={m.id}
                    onClick={() =>
                      setInviteMore(prev => [
                        ...prev,
                        {
                          id: m.id,
                          name: m.name,
                          handle: m.handle
                        }
                      ])
                    }
                  >
                    {m.name}
                  </li>
                ))}
              </ul>
            )}
            <button>Submit</button>
          </form>
        </div>
      )}
    </section>
  )
}
