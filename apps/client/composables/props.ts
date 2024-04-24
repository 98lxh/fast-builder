function useMergeProps<PropsType>(
  componentProps: PropsType,
  defaultProps: Partial<PropsType>
) {
  const _componentProps = computed(() => {
    const _componentProps = {} as PropsType
    for (const propName in componentProps) {
      if (componentProps[propName] !== undefined) {
        _componentProps[propName] = componentProps[propName]
      }
    }
    return _componentProps
  })

  const _defaultProps = computed(() => ({
    ...defaultProps,
    ..._componentProps.value
  }))

  const props = computed(() => {
    const mergeProps = {} as PropsType
    for (const propName in _defaultProps.value) {
      if (mergeProps[propName] === undefined) {
        mergeProps[propName] = _defaultProps.value[propName] as any
      }
    }

    return mergeProps
  })

  return props
}

export default useMergeProps
