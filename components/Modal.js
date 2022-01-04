import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

function Modal() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const mentionRef = useRef(null);
  console.log(open);

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      console.log(readerEvent.target.result);
      setSelectedImage(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      caption: mentionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedImage, "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, "posts", docRef.id), {
      image: downloadURL,
    });

    // dispatch(modalClose());
    setOpen(false);
    setLoading(false);
    setSelectedImage(null);
    filePickerRef.current.value = null;
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            // dispatch(modalClose());
            setOpen(false);
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {selectedImage ? (
                  <>
                    <div className="max-w-full">
                      <img
                        src={selectedImage}
                        className="w-full h-52  object-contain cursor-pointer rounded-lg"
                        onClick={() => {
                          setSelectedImage(null);
                          filePickerRef.current.value = null;
                        }}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => filePickerRef.current.click()}
                      className="inline-flex justify-center p-4 rounded-full bg-red-300 mb-5 hover:bg-red-400 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-9 w-9 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-800"
                    >
                      Upload a Picture
                    </Dialog.Title>
                  </>
                )}

                <div>
                  <input
                    type="file"
                    ref={filePickerRef}
                    hidden
                    onChange={addImage}
                  />
                </div>

                <div className="my-6">
                  <textarea
                    rows="4"
                    ref={mentionRef}
                    className="min-w-full border border-1"
                    placeholder="Mention here"
                  />
                </div>

                <div className="mt-4">
                  <button
                    onClick={uploadPost}
                    type="button"
                    disabled={!selectedImage || loading}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-300 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                  >
                    {loading ? "Uploading..." : "Upload a Post"}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
