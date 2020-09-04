import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './App.css';
import styled from "styled-components";
import background from './background.jpg';
import Main from './Main.jsx'
import { Document, Page, pdfjs } from 'react-pdf';
import samplePDF from './test.pdf';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:3000/uploader',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const MainContainer = styled.div`
width: 1440px;
height: 1024px;
`;

const MainHeader=styled.header`
width: 1440px;
height: 80px;
background: #FAFAFA;
`
const MainTitle=styled.header`
width: 666px;
height: 56px;
font-family: Inter;
font-style: normal;
font-weight: 800;
font-size: 48px;
line-height: 120%;
text-align: center;
color: black;
margin:auto;
`



const PageColumn=styled.div`
width: 475px;
height: 945px;
float:left
background:#EDCFA9;
border: 5px solid #000000;
padding: 15px
`




const UploadWindow=styled.div`
position: absolute;
width: 886px;
height: 288px;
left: 277px;
top: 300px;
background: #FAFAFA;
border: 1px dashed #000000;
box-sizing: border-box;
`

const UploadWindowMessage=styled.header`
width: 487px;
height: 91px;
left: 477px;
top: 399px;
`

const ButtonUpload=styled.button`
display: flex;
flex-direction: row;
padding: 8px 12px;

width: 197px;
height: 40px;
left: 622px;
top: 450px;

background: #457B9D;
/* Blue / 400 */

border: 1px solid #0052CC;
box-sizing: border-box;
border-radius: 3px;
`

const AddRemoveButton=styled.button`
display: flex;
flex-direction: row;
padding: 24px 48px;
width: 334px;
height: 86px;
margin: auto;

background: #1D3557;
/* Blue / 400 */

border: 1px solid #0052CC;
box-sizing: border-box;
border-radius: 3px;
`

const emptyDiv = styled.div``;


function App() {
  
  
  useEffect(()=>{
    fetch('/api').then(
      response=>response.json()
    )

  },[]);

  



  
  
  return (
    <MainContainer>
      
    <MainHeader>
    <MainTitle>Watermark PDF files online</MainTitle>
    </MainHeader>


    <div class="holy-grail-body">

			<section class="holy-grail-content">
      
      <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
  </Dragger>

			</section>

			<div class="holy-grail-sidebar-1 hg-sidebar">
      
      <form action="/changeWatermarkText" method="post">
      <AddRemoveButton>Change Watermark Text</AddRemoveButton>
    </form>


			</div>

			<div class="holy-grail-sidebar-2 hg-sidebar">
      <form action="/api" method="post">
      <AddRemoveButton>Add Watermark</AddRemoveButton>
    </form>

			</div>

		</div>



   
    
    
    </MainContainer>
  );
}

export default App;

