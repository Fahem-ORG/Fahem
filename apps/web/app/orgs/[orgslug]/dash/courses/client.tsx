'use client'
import BreadCrumbs from '@components/Dashboard/UI/BreadCrumbs'
import CreateCourseModal from '@components/Objects/Modals/Course/Create/CreateCourse'
import CourseThumbnail from '@components/Objects/Thumbnails/CourseThumbnail'
import AuthenticatedClientElement from '@components/Security/AuthenticatedClientElement'
import NewCourseButton from '@components/StyledElements/Buttons/NewCourseButton'
import Modal from '@components/StyledElements/Modal/Modal'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import fahemslogotransparent120x120 from 'public/fahem_image_transparent_120x120.png'

type CourseProps = {
  orgslug: string
  courses: any
  org_id: string
}

function CoursesHome(params: CourseProps) {
  const searchParams = useSearchParams()
  const isCreatingCourse = searchParams.get('new') ? true : false
  const [newCourseModal, setNewCourseModal] = React.useState(isCreatingCourse)
  const orgslug = params.orgslug
  const courses = params.courses

  async function closeNewCourseModal() {
    setNewCourseModal(false)
  }

  return (
    <div className="h-full w-full bg-[#f8f8f8]">
      <div>
        <div className="pl-10 mr-10 tracking-tighter">
          <BreadCrumbs type="courses" />

          <div className="w-100 flex justify-between">
            <div className="pt-3 flex font-bold text-4xl">Courses</div>
            <AuthenticatedClientElement
              checkMethod="roles"
              action="create"
              ressourceType="courses"
              orgId={params.org_id}
            >
              <Modal
                isDialogOpen={newCourseModal}
                onOpenChange={setNewCourseModal}
                minHeight="md"
                dialogContent={
                  <CreateCourseModal
                    closeModal={closeNewCourseModal}
                    orgslug={orgslug}
                  ></CreateCourseModal>
                }
                dialogTitle="Create Course"
                dialogDescription="Create a new course"
                dialogTrigger={
                  <button>
                    <NewCourseButton />
                  </button>
                }
              />
            </AuthenticatedClientElement>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mx-8 mt-7">
        {courses.map((course: any) => (
          <div className="px-3" key={course.course_uuid}>
            <CourseThumbnail course={course} orgslug={orgslug} />
          </div>
        ))}
        {courses.length == 0 && (
          <div className="flex mx-auto h-[400px]">
            <div className="flex flex-col justify-center text-center items-center space-y-5">
              <div className="mx-auto">
              <Image
                  src={fahemslogotransparent120x120}
                  quality={100}
                  width={120}
                  height={120}
                  alt=""
                  />
              </div>
              <div className="space-y-0">
                <h1 className="text-3xl font-bold text-gray-600">
                  No courses yet
                </h1>
                <p className="text-lg text-gray-400">
                  Create a course to add content
                </p>
              </div>
              <AuthenticatedClientElement
                action="create"
                ressourceType="courses"
                checkMethod="roles"
                orgId={params.org_id}
              >
                <Modal
                  isDialogOpen={newCourseModal}
                  onOpenChange={setNewCourseModal}
                  minHeight="md"
                  dialogContent={
                    <CreateCourseModal
                      closeModal={closeNewCourseModal}
                      orgslug={orgslug}
                    ></CreateCourseModal>
                  }
                  dialogTitle="Create Course"
                  dialogDescription="Create a new course"
                  dialogTrigger={
                    <button>
                      <NewCourseButton />
                    </button>
                  }
                />
              </AuthenticatedClientElement>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursesHome
