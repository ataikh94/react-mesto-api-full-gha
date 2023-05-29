import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/Auth';
import ProtectedRouteElement from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import SuccessResult from '../images/Success.svg';
import FailResult from '../images/Fail.svg';
import '../index.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [infoTooltipText, setInfoTooltipText] = React.useState('');
  const [infoTooltipImage, setInfoTooltipImage] = React.useState('');
  const [tokenCorrect, setTokenCorrect] = React.useState(false)
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setEmail(res.email);
          setLoggedIn(true);
          navigate("/main", { replace: true })
        }
      })
        .catch(err => console.log(err));
    }
  }, [])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()]
      )
      .then((res) => {
        const [userData, cards] = res;
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(e) {
    setSelectedCard(e);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    handleCardClick(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => c._id === card._id ? res : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err))
  }

  function handleUpdateUser({ name, about }) {
    api.patchUserInfo(name, about)
      .then(res => {
        console.log(res);
        setCurrentUser(res)})
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar({ avatar }) {
    api.patchAvatar(avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar
        })
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard.name, newCard.link)
      .then(res => {
        setCards([...cards, res]);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail(email);
          setLoggedIn(true);
          navigate('/main', { replace: true })
          setTokenCorrect(true);
          return;
        }
      })
      .catch(err => console.log(err));
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    setTokenCorrect(false);
    navigate("/sign-in", { replace: true })
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        setInfoTooltipText('Вы успешно зарегистрировались!');
        setInfoTooltipImage(SuccessResult);
        if (!res) {
          setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.')
          setInfoTooltipImage(FailResult);
        }
        setIsInfoTooltipOpen(true);
        setEmail(res.email);
        navigate('/sign-in', { replace: true });
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='page'>
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path='/' element={loggedIn ?
              <Navigate to='/main' replace /> :
              <Navigate to='/sign-in' replace />} />
            <Route path='/sign-up' element={<Register handleRegister={handleRegister} />} />
            <Route path='/sign-in' element={<Login handleLogin={handleLogin} />} />
            <Route path='/main' element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                signOut={signOut}
                loggedIn={loggedIn}
                email={email}
              />
            } />
            <Route path='*' element={loggedIn ?
              <Navigate to='/main' replace /> :
              <Navigate to='/sign-in' replace />} />
          </Routes>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard}
            onClose={closeAllPopups} />
          <PopupWithForm name='сonfirmDelete'
            title='Вы уверены?'
            btnName='Да' />
          <InfoTooltip isOpen={isInfoTooltipOpen}
            text={infoTooltipText}
            image={infoTooltipImage}
            onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
