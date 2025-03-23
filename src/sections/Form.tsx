"use client"

import React , { useRef , useState , useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Form() {

  const [values , setValues] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [errors , setErrors] = React.useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
  });


  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name , value } = event.target;

    if((name === "firstName" || name === "lastName") && /\d/.test(value)) {
      setErrors((prev) => ({ ...prev,[name]: true }));
    }
    else if(name === "firstName" || name === "lastName"){
      setErrors((prev) => ({ ...prev,[name]: false }))
    }

    if((name === "phoneNumber" && !/\d/.test(value))){
        setErrors((prev) => ({ ...prev,[name]: true }));
    }
    else if(name === "phoneNumber"){
        setErrors((prev) => ({ ...prev,[name]: false }))
    }

    setValues((prev) => ({ ...prev,[name]: value }))
  };


  const [selected , setSelected] = React.useState<string | null>(null)
  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  };


  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileSelected , setFileSelected] = useState(false);
  const handleClickUploadFiles = () => {
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
  }

  const handleFileChangeUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
          if (!allowedTypes.includes(file.type)) {
              alert("The selected file is not allowed! Only PDF, DOC, DOCX and TXT files are allowed.");
              return;
          }
          console.log("Selected file:" , file.name);
          setFileSelected(true)
      }
      else {
          setFileSelected(false);
      }
  }


  const [isSent , setIsSent] = React.useState(false);
  const [formValid, setFormValid] = useState(false);
  useEffect(() => {
    const isFormValid =
      values.firstName.trim() !== "" &&
      values.lastName.trim() !== "" &&
      values.phoneNumber.trim() !== "" &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.phoneNumber &&
      selected !== null &&
      fileSelected;

    setFormValid(isFormValid);
  }, [values, errors, selected, fileSelected]);
  const handleClickButton = () => {
    if (formValid) {
      setIsSent(true);
      console.log("Form submitted:" , {
        ...values,
        gender : selected,
        fileUploaded : fileSelected,
      });
    }
  };
      

  return (
    <div data-testid="form" id="form" className='w-[60%] md:w-[30%] bg-form rounded-2xl shadow-2xl p-6'>

        <h1 className='text-3xl text-center mb-6'>
          Resume submission form
        </h1>

        <div className='grid gap-3'>
          <div>
            <Box
              component="form"
              sx={{ '& > :not(style)': { marginY: '10px' , width: '32ch' , display: 'flex' , flexDirection: 'col' } }}
              noValidate
              autoComplete="off"
            >
              <TextField 
                id="first-name" 
                label="FirstName" 
                variant="standard" 
                name="firstName"
                value={values.firstName}
                onChange={handleChangeTextField}
                error={errors.firstName}
                helperText={errors.firstName ? "FirstName should not contain numbers" : ""}
                />

              <TextField 
                id="last-name" 
                label="LastName" 
                variant="standard" 
                name="lastName"
                value={values.lastName}
                onChange={handleChangeTextField}
                error={errors.lastName}
                helperText={errors.lastName ? "LastName should not contain numbers" : ""}
                />

              <TextField 
                id="phone-number" 
                label="PhoneNumber" 
                variant="standard" 
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChangeTextField}
                error={errors.phoneNumber}
                helperText={errors.phoneNumber ? "PhoneNumber should only contain numbers" : ""}
                />
            </Box>
          </div>

          <div className=''>
            <FormControl 
              component="fieldset">
                <RadioGroup 
                  row 
                  aria-label="gender" 
                  name="gender" 
                  value={selected} 
                  onChange={handleChangeGender}
                  >

                  <FormControlLabel 
                    value="woman" 
                    control={<Radio size='small'/>} 
                    label="Woman" 
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '12px',
                        marginLeft: '-5px'
                      },
                    }}
                    />
                  <FormControlLabel 
                    value="man" 
                    control={<Radio size='small'/>} 
                    label="Man" 
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '12px',
                        marginLeft: '-5px'
                      },
                    }}
                    />

                </RadioGroup>
            </FormControl>
          </div>

          <div className=''>
            <div
              className='bg-gray-200 border-dashed border-2 border-gray-400 rounded-2xl py-[10%] cursor-pointer'
              onClick={handleClickUploadFiles}
            >
              <h3 
                  className='text-gray-400 text-center text-sm hover:text-blue-400 transition-colors duration-300'
              >
                  {fileSelected ? (" A file has been selected!" )
                  : (
                      <>
                          Drop your resume file or click <br /> to upload!
                      </>
                  )}
              </h3>
              <input 
                  type="file"
                  data-testid='file-input'
                  ref={fileInputRef}
                  className='hidden'
                  onChange={handleFileChangeUploadFiles}
                  accept='.pdf,.doc,.docx,.txt'
              />

            </div>
          </div>
        </div>

        <div className='flex justify-center items-center mt-16'>
          <Stack direction="row">
            <Button 
              variant="contained"
              sx={{fontFamily: 'Archivo' , bgcolor: isSent ? '#4CAF50' : '#9d560f' ,
                '&:hover' : {
                  bgcolor: isSent ? '#45a049' : '#8a4b0e' ,
                },
              }}
              onClick={handleClickButton}
              disabled={!formValid}
            >
              {isSent ? 'SENT RESUME' : 'SEND RESUME'}
            </Button>
          </Stack>
        </div>

    </div>
  )
}

export default Form