'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { INSTALL_STEPS } from './steps/steps'
import fahemslugan from 'public/logo-landing-page-slug.png'
import GeneralWrapperStyled from '@components/StyledElements/Wrappers/GeneralWrapper'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function InstallClient() {
  return (
    <GeneralWrapperStyled>
      <Suspense>
        <>
          <Stepscomp />
        </>
      </Suspense>
    </GeneralWrapperStyled>
  )
}

const Stepscomp = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const step: any = parseInt(searchParams.get('step') || '0')
  const [stepNumber, setStepNumber] = React.useState(step)
  const [stepsState, setStepsState] = React.useState(INSTALL_STEPS)

  function handleStepChange(stepNumber: number) {
    setStepNumber(stepNumber)
    router.push(`/install?step=${stepNumber}`)
  }

  useEffect(() => {
    setStepNumber(step)
  }, [step])

  return (
    <div>
      <div className="flex justify-center ">
        <div className="grow">
                <Image
                  src={fahemslugan}
                  quality={100}
                  width={133}
                  height={80}
                  alt=""
                />
        </div>
        <div className="steps flex space-x-2 justify-center text-sm p-3 bg-slate-50 rounded-full w-fit m-auto px-10">
          <div className="flex space-x-8">
            {stepsState.map((step, index) => (
              <div
                key={index}
                className={`flex items-center cursor-pointer space-x-2`}
                onClick={() => handleStepChange(index)}
              >
                <div
                  className={`flex w-7 h-7 rounded-full text-slate-700 bg-slate-200 justify-center items-center m-auto align-middle hover:bg-slate-300 transition-all ${
                    index === stepNumber ? 'bg-slate-300' : ''
                  }`}
                >
                  {index}
                </div>
                <div>{step.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex pt-8 flex-col">
        <h1 className="font-bold text-3xl">{stepsState[stepNumber].name}</h1>
        <div className="pt-8">{stepsState[stepNumber].component}</div>
      </div>
    </div>
  )
}



export default InstallClient
