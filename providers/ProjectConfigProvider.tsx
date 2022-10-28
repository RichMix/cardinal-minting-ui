import { firstParam } from '@cardinal/common'
import type { ProjectConfig } from 'config/config'
import { projectConfigs } from 'config/config'
import type { NextPageContext } from 'next'
import type { ReactChild } from 'react'
import React, { useContext, useState } from 'react'

export const getInitialProps = async ({
  ctx,
}: {
  ctx: NextPageContext
}): Promise<{ cluster: string; config: ProjectConfig }> => {
  const host = ctx.req?.headers.host || ctx.query.host
  const cluster = host?.includes('dev')
    ? 'devnet'
    : (ctx.query.project || ctx.query.host)?.includes('test')
    ? 'testnet'
    : ctx.query.cluster || process.env.BASE_CLUSTER

  const projectParams =
    ctx.query.config || ctx.req?.headers.host || ctx.query.host
  const project =
    projectParams &&
    (typeof projectParams === 'string' ? projectParams : projectParams[0])
      ?.split('.')[0]
      ?.replace('dev-', '')

  console.log(project)
  const defaultConfig = projectConfigs['unverified']!
  return {
    cluster: firstParam(cluster),
    config: project
      ? projectConfigs[project] ||
        Object.values(projectConfigs).find(
          (config) => config.hostname && projectParams.includes(config.hostname)
        ) ||
        defaultConfig
      : defaultConfig,
  }
}

export function getLink(path: string, withParams = true) {
  return `${window.location.origin}${path}${
    withParams
      ? path.includes('?') && window.location.search
        ? `${window.location.search.replace('?', '&')}`
        : window.location.search ?? ''
      : ''
  }`
}

export interface ProjectConfigValues {
  config: ProjectConfig
  setProjectConfig: (s: string) => void
}

const ProjectConfigValues: React.Context<ProjectConfigValues> =
  React.createContext<ProjectConfigValues>({
    config: projectConfigs['unverified']!,
    setProjectConfig: () => {},
  })

export function ProjectConfigProvider({
  children,
  defaultConfig,
}: {
  children: ReactChild
  defaultConfig: ProjectConfig
}) {
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig)
  return (
    <ProjectConfigValues.Provider
      value={{
        config: config,
        setProjectConfig: (project: string) => {
          if (projectConfigs[project]) {
            setConfig(projectConfigs[project]!)
          }
        },
      }}
    >
      {children}
    </ProjectConfigValues.Provider>
  )
}

export function useProjectConfig(): ProjectConfigValues {
  return useContext(ProjectConfigValues)
}
