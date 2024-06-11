export const dynamic = 'force-dynamic'
import { Metadata } from 'next'
import Image from 'next/image'
import fahemslogotransparent from 'public/fahem_image_transparent_50x50.png'
import { getUriWithOrg } from '@services/config/config'
import { getOrgCoursesWithAuthHeader } from '@services/courses/courses'
import Link from 'next/link'
import { getOrgCollectionsWithAuthHeader } from '@services/courses/collections'
import { getOrganizationContextInfo } from '@services/organizations/orgs'
import { cookies } from 'next/headers'
import GeneralWrapperStyled from '@components/StyledElements/Wrappers/GeneralWrapper'
import TypeOfContentTitle from '@components/StyledElements/Titles/TypeOfContentTitle'
import { getAccessTokenFromRefreshTokenCookie } from '@services/auth/auth'
import CourseThumbnail from '@components/Objects/Thumbnails/CourseThumbnail'
import CollectionThumbnail from '@components/Objects/Thumbnails/CollectionThumbnail'
import AuthenticatedClientElement from '@components/Security/AuthenticatedClientElement'
import NewCourseButton from '@components/StyledElements/Buttons/NewCourseButton'
import NewCollectionButton from '@components/StyledElements/Buttons/NewCollectionButton'
import ContentPlaceHolderIfUserIsNotAdmin from '@components/ContentPlaceHolder'

type MetadataProps = {
  params: { orgslug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  // Get Org context information
  const org = await getOrganizationContextInfo(params.orgslug, {
    revalidate: 1800,
    tags: ['organizations'],
  })

  // SEO
  return {
    title: `Home — ${org.name}`,
    description: org.description,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    openGraph: {
      title: `Home — ${org.name}`,
      description: org.description,
      type: 'website',
    },
  }
}

const OrgHomePage = async (params: any) => {
  const orgslug = params.params.orgslug
  const cookieStore = cookies()

  const access_token = await getAccessTokenFromRefreshTokenCookie(cookieStore)
  const courses = await getOrgCoursesWithAuthHeader(
    orgslug,
    { revalidate: 0, tags: ['courses'] },
    access_token ? access_token : null
  )
  const org = await getOrganizationContextInfo(orgslug, {
    revalidate: 1800,
    tags: ['organizations'],
  })
  const org_id = org.id
  const collections = await getOrgCollectionsWithAuthHeader(
    org.id,
    access_token ? access_token : null,
    { revalidate: 0, tags: ['courses'] }
  )

  return (
    <div>
      <GeneralWrapperStyled>
        {/* Collections */}
        <div className="flex items-center ">
          <div className="flex grow">
            <TypeOfContentTitle title="Collections" type="col" />
          </div>
          <AuthenticatedClientElement
            checkMethod="roles"
            ressourceType="collections"
            action="create"
            orgId={org_id}
          >
            <Link href={getUriWithOrg(orgslug, '/collections/new')}>
              <NewCollectionButton />
            </Link>
          </AuthenticatedClientElement>
        </div>
        <div className="home_collections flex flex-wrap">
          {collections.map((collection: any) => (
            <div
              className="flex flex-col py-3 px-3"
              key={collection.collection_id}
            >
              <CollectionThumbnail
                collection={collection}
                orgslug={orgslug}
                org_id={org.org_id}
              />
            </div>
          ))}
          {collections.length == 0 && (
            <div className="flex mx-auto h-[100px]">
              <div className="flex flex-col justify-center text-center items-center space-y-3">
                <div className="flex flex-col space-y-3">
                  <div className="mx-auto">
                  <Image
                  src={fahemslogotransparent}
                  quality={100}
                  width={50}
                  height={50}
                  alt=""
                  />
                  </div>
                  <div className="space-y-0">
                    <h1 className="text-xl font-bold text-gray-600">
                      No collections yet
                    </h1>
                    <p className="text-md text-gray-400">
                      <ContentPlaceHolderIfUserIsNotAdmin
                        text="Create collections to group courses together"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Courses */}
        <div className="h-5"></div>
        <div className="flex items-center ">
          <div className="flex grow">
            <TypeOfContentTitle title="Courses" type="cou" />
          </div>
          <AuthenticatedClientElement
            ressourceType="courses"
            action="create"
            checkMethod="roles"
            orgId={org_id}
          >
            <Link href={getUriWithOrg(orgslug, '/courses?new=true')}>
              <NewCourseButton />
            </Link>
          </AuthenticatedClientElement>
        </div>
        <div className="home_courses flex flex-wrap">
          {courses.map((course: any) => (
            <div className="py-3 px-3" key={course.course_uuid}>
              <CourseThumbnail course={course} orgslug={orgslug} />
            </div>
          ))}
          {courses.length == 0 && (
            <div className="flex mx-auto h-[300px]">
              <div className="flex flex-col justify-center text-center items-center space-y-3">
                <div className="flex flex-col space-y-3">
                  <div className="mx-auto">
                  <Image
                  src={fahemslogotransparent}
                  quality={100}
                  width={50}
                  height={50}
                  alt=""
                  />
                  </div>
                  <div className="space-y-0">
                    <h1 className="text-xl font-bold text-gray-600">
                      No courses yet
                    </h1>
                    <p className="text-md text-gray-400">
                      <ContentPlaceHolderIfUserIsNotAdmin text='Create courses to add content' />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </GeneralWrapperStyled>
    </div>
  )
}

export default OrgHomePage
