import React from 'react'
import DocumentTitle from 'react-document-title';

export default function AppTitle({ title, children }) {
  return <DocumentTitle title={title ? ` ${title} - Sager` : 'Home - Sager'} children={children} />;
}