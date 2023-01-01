import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Auth from './Components/Auth/Auth';
import PostDetail from './Components/PostDetails/PostDetail';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate replace to="/posts" />} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
