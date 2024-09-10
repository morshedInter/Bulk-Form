import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";

import { RxCross2 } from "react-icons/rx";
import { FaUpload } from "react-icons/fa";


const BulkFileForm = () => {
    const { register, handleSubmit, unregister, formState: { errors }, reset } = useForm();
    const fileInputField = useRef(null);
    const [files, setFiles] = useState([]);

    const clickInputField = () => {
        fileInputField.current.click();
    }
    // array of selected files
    const onSelectedFiles = (e) => {
        if (files.length > 10) {
            alert("You cannot upload more than 10 files at a time");
            setFiles([]);
        }
        else {
            setFiles(Array.from(e.target.files));
            reset()
        }};

        // remove file from list
        const removefile = (index) => {
            unregister(`files[${index}]`);
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);
            reset()
        }


        const onSubmit = (data) => {
            console.log("Form data:", data);


        };

        return (
            <div className="min-h-screen max-w-[750px] lg:max-w-7xl pb-10 mx-auto p-4">
                <div className="w-full mx-auto mt-10">
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .svg, .webp"
                        multiple
                        onChange={onSelectedFiles}
                        ref={fileInputField}
                        style={{ display: "none" }}
                    />
                    <div className=" flex justify-center items-center w-full">
                        {files.length === 0 && (
                            <button
                                onClick={() => clickInputField()}
                                className="w-60 h-48 border rounded-2xl flex flex-col gap-2 justify-center items-center text-5xl text-[#ff0000] mt-20"
                            >
                                <FaUpload />
                                <span className="text-sm text-gray-600 mt-2">
                                    Upload Preview Images
                                </span>
                            </button>
                        )}
                    </div>
                    {files?.length > 0 && (
                        <div className="flex justify-end">
                            <span className="text-end text-gray-700">
                                Total Selected Files: {files?.length}
                            </span>
                        </div>
                    )}
                    {/* form */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {files.map((file, index) => (

                            <div className={`grid grid-cols-3 gap-4 border  p-4 rounded-lg shadow mt-3`} key={index}>
                                <div className="border m-2 md:mb-6 flex-1 rounded-lg w-28 flex  justify-center ">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        className="p-1 rounded-xl"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                {/* Delete row */}
                                <div></div>
                                <div className="flex justify-end  mt-4 ">
                                    <button
                                        className="w-10 h-10 border rounded-xl bg-red-500 text-white"
                                        onClick={() => removefile(index)}
                                    >
                                        <span className="flex justify-center text-3xl">
                                            <RxCross2 />
                                        </span>
                                    </button>
                                </div>

                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    {...register(`files[${index}].title`, { required: true })}
                                />
                                {/* {errors.files?.[index]?.title && <p className="text-red-500">This field is required</p>} */}

                                <TextField
                                    label="Meta Title"
                                    {...register(`files[${index}].metaTitle`)}

                                />

                                <TextField
                                    label="Category"
                                    {...register(`files[${index}].category`, { required: true })}
                                />

                                <TextField
                                    label="Sub-Category"
                                    {...register(`files[${index}].subCategory`)}
                                />

                                <TextField
                                    label="File Type"
                                    {...register(`files[${index}].fileType`, { required: true })}
                                />

                                <TextField
                                    label="Application Supported"
                                    {...register(`files[${index}].applicationSupported`)}
                                />

                                <TextField
                                    label="Tag"
                                    {...register(`files[${index}].tag`)}
                                />
                                {/* Main File and Preview File */}
                                <input
                                    type="file"
                                    {...register(`files[${index}].mainFile`)}
                                />

                                <input
                                    type="file"
                                    {...register(`files[${index}].previewFile`)}
                                />

                                <TextField
                                    label="Description"
                                    multiline
                                    rows={3}
                                    {...register(`files[${index}].description`, { required: true })}
                                />

                                <TextField
                                    label="Meta Description"
                                    multiline
                                    rows={3}
                                    {...register(`files[${index}].metaDescription`)}
                                />


                            </div>
                        ))}
                        {/* submit button */}
                        {files.length > 0 &&
                            <div className="flex mx-auto items-center justify-center mt-5">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-32 h-10 bg-[#ff0000] hover:bg-white text-xs md:text-[12px] border-[1px] border-[#ff0000] lg:text-[15px] font-medium tracking-wide text-white hover:text-[#ff0000]  transition duration-300 rounded-lg hover-visible:outline-none whitespace-nowrap  hover:shadow-2xl uppercase hover:cursor-pointer"
                                >
                                    Upload
                                </button>
                            </div>
                        }
                    </form>
                </div>

            </div>
        );
    };

    export default BulkFileForm;
