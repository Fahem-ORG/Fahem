'use client'
import CreateCourseModal from '@components/Objects/Modals/Course/Create/CreateCourse'
import Modal from '@components/StyledElements/Modal/Modal'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import fahemslogotransparent120x120 from 'public/fahem_image_transparent_120x120.png'
import GeneralWrapperStyled from '@components/StyledElements/Wrappers/GeneralWrapper'
import TypeOfContentTitle from '@components/StyledElements/Titles/TypeOfContentTitle'
import AuthenticatedClientElement from '@components/Security/AuthenticatedClientElement'
import CourseThumbnail from '@components/Objects/Thumbnails/CourseThumbnail'
import NewCourseButton from '@components/StyledElements/Buttons/NewCourseButton'
import useAdminStatus from '@components/Hooks/useAdminStatus'

interface CourseProps {
  orgslug: string
  courses: any
  org_id: string
}

function Courses(props: CourseProps) {
  const orgslug = props.orgslug
  const courses = props.courses
  const searchParams = useSearchParams()
  const isCreatingCourse = searchParams.get('new') ? true : false
  const [newCourseModal, setNewCourseModal] = React.useState(isCreatingCourse)
  const isUserAdmin = useAdminStatus() as any

  async function closeNewCourseModal() {
    setNewCourseModal(false)
  }

  return (
    <div>
      <GeneralWrapperStyled>
        <div className="flex flex-wrap justify-between">
          <TypeOfContentTitle title="Courses" type="cou" />
          <AuthenticatedClientElement
            checkMethod="roles"
            action="create"
            ressourceType="courses"
            orgId={props.org_id}
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

        <div className="flex flex-wrap">
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
                  {isUserAdmin ? (<p className="text-lg text-gray-400">
                    Create a course to add content
                  </p>) : (<p className="text-lg text-gray-400">
                    No courses available yet
                    </p>)}
                </div>
                <AuthenticatedClientElement
                  action="create"
                  ressourceType="courses"
                  checkMethod="roles"
                  orgId={props.org_id}
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
      </GeneralWrapperStyled>
    </div>
  )
}

export default Courses
