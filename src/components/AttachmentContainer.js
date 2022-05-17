import { useState, useRef, useCallback, useEffect } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import PdfIcon from '../assets/icons/HandPointing.png';
import UploadIcon from '../assets/Tray.png';
import { Container } from 'react-bootstrap';
import './component.css';
// import axios from "axios";
// import { SERVER, HEADERS } from "../../constants/baseUrl";
// import { fetchToken } from "../../utils";

const AttachmentContainer = ({ setAttachment }) => {
  const [fileName, setFileName] = useState('');
//   const [location, setLocation] = useState('');
  let fileFormat = useRef();

  const onDrop = useCallback(acceptedFiles => {
    fileFormat.current = acceptedFiles;
    setFileName(acceptedFiles[0].name);
  }, []);

  //   const sendToS3 = async () => {
  //     const config = fetchToken(HEADERS);
  //     const formData = new FormData();
  //     formData.append("image", fileFormat.current[0]);

  //     try {
  //       let { data } = await axios.post(
  //         `${SERVER}/api/amazonupload`,
  //         formData,
  //         config
  //       );
  //       setLocation(data.data.Location);
  //     } catch (err) {
  //       console.log(err);
  //     }

  //     setAttachment([
  //       {
  //         name: fileName,
  //         url: location,
  //         date: new Date(),
  //         size: fileFormat.current[0].size,
  //         type: fileFormat.current[0].type,
  //       },
  //     ]);
  //   };

  //   useEffect(() => {
  //     if (fileFormat.current?.length > 0) {
  //       sendToS3();
  //     }
  //   }, [fileName]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="columns attachment mt30" {...getRootProps()}>
      <Container className="attachments  column is-three-fifths">
        {/* <p
          style={{
            fontSize: '16px',
            color: '#939191',
            fontWeight: '500',
          }}
        >
          ATTACHMENTS
        </p> */}
        <div className="pdf">
          {fileFormat.current &&
            (fileFormat.current[0].type === 'application/pdf' ? (
              <img src={PdfIcon} alt="pdf" />
            ) : fileFormat.current[0].type.includes('image/') ? (
              <FaFileImage size={25} color="#253777" />
            ) : null)}

          <p
            style={{
              wordWrap: 'break-word',
              color: '#939191',
            }}
          >
            {fileName}
          </p>
        </div>

        <div className="add-files">
          <input
            {...getInputProps()}
            accept="image/*,.pdf"
            type="file"
            name="image"
          />
          <img src={UploadIcon} alt="upload" /> <p className='DragText'>Drag docs here</p>
          <p className='DropText'>or click to choose docs from your computer</p>
        </div>
      </Container>
    </div>
  );
};

export default AttachmentContainer;
