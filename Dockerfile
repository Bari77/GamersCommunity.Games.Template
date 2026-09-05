# Build from this game repo only (Core from GitHub NuGet Packages).

FROM mcr.microsoft.com/dotnet/runtime:10.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
ARG GITHUB_TOKEN=
WORKDIR /src

COPY nuget.config ./
COPY Template.Consumer/Template.Consumer.csproj Template.Consumer/
COPY Template.Database/Template.Database.csproj Template.Database/

RUN if [ -n "$GITHUB_TOKEN" ]; then \
      dotnet nuget update source github \
        --username "x-access-token" \
        --password "$GITHUB_TOKEN" \
        --store-password-in-clear-text; \
    fi \
    && dotnet restore "Template.Consumer/Template.Consumer.csproj"

COPY Template.Consumer/ Template.Consumer/
COPY Template.Database/ Template.Database/
WORKDIR /src/Template.Consumer
RUN dotnet publish "Template.Consumer.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Template.Consumer.dll"]
