import React from 'react';
import Navbar from '../component/Navbar';
import ExportComp from '../component/ExportComp';

function Export() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ExportComp/>
    </div>
  );
}

export default Export;