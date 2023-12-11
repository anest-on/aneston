export interface MultiStepProps {
  size: number
  currentStep?: number
}

export function MultiStep({ size, currentStep = 1 }: MultiStepProps) {
  return (
    <div>
      <p className="text-gray-200 text-xs">
        Passo {currentStep} de {size}
      </p>

      <div className={`grid grid-cols-${size} gap-2 mt-1`}>
        {Array.from({ length: size }, (_, i) => i + 1).map((step) => {
          return (
            <div
              className={`h-1 rounded  ${
                currentStep >= step ? 'bg-gray-100' : 'bg-gray-600'
              }`}
              key={step}
            />
          )
        })}
      </div>
    </div>
  )
}

MultiStep.displayName = 'MultiStep'
