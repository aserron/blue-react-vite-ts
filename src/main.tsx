import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Gallery} from "./components/Gallery.tsx";

/**
 * - add context provider to transfer thumbnail data.
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Gallery />
  </>,
)
