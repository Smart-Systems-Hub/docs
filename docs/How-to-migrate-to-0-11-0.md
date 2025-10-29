# How to migrate to Tractus-X EDC 0.11.0

This guide explains how to migrate your connector to Tractus-X EDC version 0.11.0.

## Contact Smart-Systems-Hub

If you are using Tractus-X EDC from Smart-Systems-Hub and want to upgrade to version 0.11.0, please contact Smart-Systems-Hub.

Smart-Systems-Hub will update your credentials. To use Tractus-X EDC 0.11.0 you will need `DataExchangeGovernanceCredential` and `BpnCredential`, in addition to your existing `MembershipCredential`. If you currently only have `MembershipCredential`, Smart-Systems-Hub will add `DataExchangeGovernanceCredential` and `BpnCredential` for you.

Smart-Systems-Hub will then apply the required changes in your `values.yaml` file and perform a `Helm` upgrade so your connector migrates to 0.11.0.

> **Note:** Your connector endpoint and other details will remain the same. Your assets, policies, etc., will remain unchanged.

> **Note:** If you are working with Tractus-X EDC 0.11.0, you must use the updated Management API walkthrough. See: [Management-API-Overview](Management-API-Overview-0-11-0.md)